const ENOUGH_TIME = 1; // in milliseconds

let workQueue = [];
let nextUnitOfWork = null;

export function scheduleTask() {
  workQueue.push(task);
  requestIdleCallback(performTask); // to import
}

export function performTask(deadline) {
  if (!nextUnitOfWork) {
    nextUnitOfWork = workQueue.shift();
  }

  while (nextUnitOfWork && deadline.timeRemaining() > ENOUGH_TIME) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork); // to import;
  }

  if (nextUnitOfWork || workQueue.length > 0) {
    requestIdleCallback(performTask);
  }
}
