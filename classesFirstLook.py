class Rectangle: 
  def __init__(self, width, height):
    self.width = width
    self.height = height 

  @property
  def width(self):
    return self._width

  @width.setter
  def width(self, width):
    if width < 0: 
      raise ValueError("Width must be positive.")
    else: 
      self.width = width

  @property
  def height(self):
    return self._height
  
  @height.setter
  def height(self, height): 
    if height < 0: 
      raise ValueError("Height must be positive.")
    else: 
      self.height = height

  def __repr__(self): 
    return "Rectangle({0}, {1})".format(self.width, self.height)

  def __str__(self):
    return "Rectangle with width {0} and height {1}.".format(self.width, self.height)

  def __eq__(self, other): 
    return self.width == other.width and self.height == other.height

r1 = Rectangle(15, 30)
r2 = Rectangle(15, 30)

x = r1
print(x)
print(str(r1))
print(r1 == r2)
print(r1.width)
r1.width = 43
print(r1.width)