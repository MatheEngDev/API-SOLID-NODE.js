-- Rename the misspelled column to its correct name.
ALTER TABLE "check_ins"
RENAME COLUMN "valdated_at" TO "validated_at";