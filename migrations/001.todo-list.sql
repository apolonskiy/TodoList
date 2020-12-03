CREATE EXTENSION if not exists "uuid-ossp" with schema public;

CREATE SCHEMA if not exists tdl;

CREATE TABLE if not exists tdl.todo_list
(
        todo_list_id                 UUID                    NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
        todo_name                    VARCHAR(25)             NOT NULL
);

ALTER TABLE tdl.todo_list
    DROP CONSTRAINT IF EXISTS todo_list_todo_name_key;
ALTER TABLE tdl.todo_list
    ADD CONSTRAINT todo_list_todo_name_key UNIQUE (todo_name);

CREATE INDEX if not exists todo_name_index ON tdl.todo_list USING btree (todo_name);

CREATE TABLE if not exists tdl.todo_list_item
(
        todo_list_id                 UUID                    NOT NULL,
        todo_list_item_id            UUID                    NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
        is_completed                 BOOLEAN                 NOT NULL DEFAULT false,
        is_favourite                 BOOLEAN                 NOT NULL DEFAULT false,
        todo_list_item_text          VARCHAR(127)            NOT NULL,
        CONSTRAINT todo_list_item_id_fk FOREIGN KEY (todo_list_id) REFERENCES tdl.todo_list (todo_list_id) ON DELETE CASCADE
);

CREATE INDEX if not exists todo_list_id_item_text_index ON tdl.todo_list_item USING btree (todo_list_id, todo_list_item_text);

CREATE INDEX if not exists todo_item_completed_text_index ON tdl.todo_list_item USING btree (is_completed, todo_list_item_text);

CREATE INDEX if not exists todo_item_favourite_text_index ON tdl.todo_list_item USING btree (is_favourite, todo_list_item_text);

CREATE INDEX if not exists todo_item_favourite_completed_text_index ON tdl.todo_list_item USING btree (is_favourite, is_completed, todo_list_item_text);
