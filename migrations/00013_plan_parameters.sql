-- +goose Up

ALTER TABLE plans ADD COLUMN parameters JSONB NOT NULL DEFAULT '{}';
ALTER TABLE plan_runs ADD COLUMN input JSONB NOT NULL DEFAULT '{}';

-- +goose Down

ALTER TABLE plan_runs DROP COLUMN IF EXISTS input;
ALTER TABLE plans DROP COLUMN IF EXISTS parameters;
