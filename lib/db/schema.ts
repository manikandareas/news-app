import { relations, sql } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
    id: text("id").primaryKey(),
    username: text("username").notNull().unique(),
    hashedPassword: text("hashed_password"),
    googleId: text("google_id").unique(),
});

export const sessionTable = pgTable("session", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => userTable.id),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date",
    }).notNull(),
});

export const categoriesTable = pgTable("categories", {
    id: text("id").primaryKey(),
});

export const newsTable = pgTable("news", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    content: text("content").notNull(),
    slug: text("slug").notNull(),
    thumbnail: text("thumbnail").notNull(),
    pubDate: timestamp("pub_date").default(sql`CURRENT_TIMESTAMP`),
    readTime: integer("read_time").default(0),
    authorId: text("author_id")
        .notNull()
        .references(() => userTable.id),
    category: text("category")
        .notNull()
        .references(() => categoriesTable.id),
});

export const newsRelation = relations(newsTable, ({ one }) => {
    return {
        author: one(userTable, {
            fields: [newsTable.authorId],
            references: [userTable.id],
        }),
        category: one(categoriesTable, {
            fields: [newsTable.category],
            references: [categoriesTable.id],
        }),
    };
});
