-- The 487 rows in `users` carry Clerk ids from the instance the retired chat
-- app used. Signing in through today's instance yields a different id for the
-- same person, so `INSERT ... ON CONFLICT (id)` slipped past the id conflict
-- and hit users_email_unique instead.
--
-- The fix re-keys the existing row to the current Clerk id, which keeps
-- auth().userId equal to users.id everywhere and avoids an email lookup on
-- every read. That only works if dependants follow the key.

ALTER TABLE messages DROP CONSTRAINT IF EXISTS messages_user_id_users_id_fk;
ALTER TABLE messages
    ADD CONSTRAINT messages_user_id_users_id_fk
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE favorites DROP CONSTRAINT IF EXISTS favorites_user_id_fkey;
ALTER TABLE favorites
    ADD CONSTRAINT favorites_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES users (id)
    ON UPDATE CASCADE ON DELETE CASCADE;
