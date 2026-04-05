import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, clients, repairs, InsertClient, InsertRepair, Client, Repair } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId || !updateSet.role) {
      // Set as admin if: owner ID matches OR no role set yet (first user)
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Client queries
 */
export async function getAllClients() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(clients).execute();
}

export async function getClientById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(clients).where(eq(clients.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createClient(data: InsertClient) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(clients).values(data);
  return result;
}

export async function updateClient(id: number, data: Partial<InsertClient>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(clients).set(data).where(eq(clients.id, id));
}

export async function deleteClient(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(clients).where(eq(clients.id, id));
}

/**
 * Repair queries
 */
export async function getAllRepairs() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(repairs).execute();
}

export async function getRepairById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(repairs).where(eq(repairs.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getRepairsByClientId(clientId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(repairs).where(eq(repairs.clientId, clientId)).execute();
}

export async function createRepair(data: InsertRepair) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(repairs).values(data);
  return result;
}

export async function updateRepair(id: number, data: Partial<InsertRepair>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(repairs).set(data).where(eq(repairs.id, id));
}

export async function deleteRepair(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(repairs).where(eq(repairs.id, id));
}
