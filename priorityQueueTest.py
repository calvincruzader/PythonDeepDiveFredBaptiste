# try:
#     import Queue as Q  # ver. < 3.0
# except ImportError:
#     import queue as Q

# class Skill(object):
#     def __init__(self, priority, description):
#         self.priority = priority
#         self.description = description
#         print 'New Level:', description
#         return
#     def __cmp__(self, other): # not intuitive
#       return self.priority - other.priority

# q = Q.PriorityQueue()

# q.put(Skill(5, 'Proficient'))
# q.put(Skill(10, 'Expert'))
# q.put(Skill(1, 'Novice'))

# while not q.empty():
#     next_level = q.get()
#     print 'Processing level:', next_level.description


import Queue as Q 

class Rectangle(object): 
  def __init__(self, length, width):
    self.length = length
    self.width = width

  def area(self): 
    return self.length * self.width

  def __cmp__(self, other): 
    val = self.area() - other.area()
    return val

myQ = Q.PriorityQueue()

myQ.put(Rectangle(5, 10))
myQ.put(Rectangle(1,2))
myQ.put(Rectangle(100,100))

# while not myQ.empty():
#   item = myQ.get() 
#   print(item.area())

'''
Looks like in order to implement your own PQ, then you have to create your own objects that have a comparison operator __cmp__ that will override the default dunder __cmp__ method
Similarities to Java: in the end, you'll still make a call to a priorityqueue class to instantiate a PQ object, it's just that you have to embed the comparator in your own 
defined object rather than just pass in a comparator to the PQ object.... 
  - this is not good for simple integer stuff (max PQ becomes way too heavy handed for such things)
    - simple case in which it's too heavy-handed: max priority queue implementation 
'''

class myPQ(Q.PriorityQueue):
  def __cmp__(self, other):
    print("hello")
    return self - other


myQQ = myPQ() 
myQQ.put(1)
myQQ.put(3)
myQQ.put(-10)

while not myQQ.empty():
  item = myQQ.get() 
  print(item)


