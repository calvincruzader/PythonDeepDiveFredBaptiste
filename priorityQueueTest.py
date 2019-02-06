from Queue import PriorityQueue
import inspect

print(inspect.getmembers(PriorityQueue, predicate=inspect.ismethod))