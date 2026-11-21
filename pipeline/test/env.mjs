// Imported first by tests that need fast fake-network runs: module-level politeness gaps are read at import time.
process.env.PIPELINE_MIN_GAP_MS = '0';
process.env.EVENTBRITE_GAP_MS = '0';
