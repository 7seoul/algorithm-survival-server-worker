const timers = new Map();

function start(label) {
  timers.set(label, process.hrtime.bigint());
}

function end(label, logger = console) {
  const start = timers.get(label);
  if (!start) return;
  const duration = Number(process.hrtime.bigint() - start) / 1_000_000;
  logger.info(`${label} took ${duration.toFixed(2)} ms`);
  timers.delete(label);
}

module.exports = { start, end };
