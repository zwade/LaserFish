
 
from tkinter import *
from time import clock
from sys import *
from math import sqrt, atan2, pi
setrecursionlimit(7000)

root = Tk()
START = clock()
WIDTH = 512
HEIGHT = 512
COLORFLAG = sys.argv[1] if len(sys.argv)>=2 else False
HIGH = 60
LOW = 25	
NUMBER_OF_TIMES_TO_SMOOTH_IMAGE = 2



def confirmP3fileType(file1):
   stng = file1.readline().strip()
   if stng[0]+stng[1]  != 'P3':
      print('+--------------------------------------------+\
             | Error: This file is NOT of type P3         |\
             |        The first line of the file is shown |\
             +--------------------------------------------+')
      print('-->',stng)
      file1.close()
      exit()
    
def printElapsedTime(msg = 'time'):
   length = 30
   msg = msg[:length]
   tab = '.'*(length-len(msg))
   print('--' + msg.upper() + tab + '',end = "")
   time = round(clock() - START,1)
   print( '%2d'%int(time/60), ' min :', '%4.1f'%round(time%60,1), ' sec', sep='')

def readFileNumbersIntoString(file1):
   nums = file1.read().split()
   file1.close()
   if len(nums)%3 != 0:
      print('--Error: Size of file(',len(nums),') % 3 != 0')
      exit()
   return nums

def theta(x,y):
   t = atan2(y,x)
   while (t<0):
      t+=pi
   ret = round(t/pi*4)
   while ret > 3:
      ret -= 4
   return ret

def convertStringRGBsToGrayIntegersOrColorTuples(nums):
   ret = []
   if COLORFLAG:
     for pos in range(int(len(nums)/3)):
        ret.append((int(nums[pos*3]),int(nums[pos*3+1]),int(nums[pos*3+2])))
   else:
     for pos in range(int(len(nums)/3)): 
        ret.append(int(int(nums[pos*3])*0.2+int(nums[pos*3+1])*0.7+ int(nums[pos*3+2])*0.1))
   return ret

def printTitleAndSizeOfImageInPixels(image):
   print('        ==<RUN TIME INFORMATION>==')
   if len(image) != WIDTH * HEIGHT:
      print('--ERROR: Stated file size not equal to number of pixels')
      print('file length:',len(image))
      print('     width: ',WIDTH,' height:',HEIGHT)
      exit()
   print('--NUMBER OF PIXELS.................. ',len(image))
   printElapsedTime('image extracted from file')

   
def readPixelColorsFromFile(file1):
   confirmP3fileType(file1)
   nums = readFileNumbersIntoString(file1)
   image = convertStringRGBsToGrayIntegersOrColorTuples(nums)
   printTitleAndSizeOfImageInPixels(image)
   return image

from copy import deepcopy

def blurify(image):
   ret = [0]*len(image)
   for i in range(1,WIDTH-1):
      for a in range(1,HEIGHT-1):
         summ = 1*image[(i-1)*512+(a-1)] +\
                2*image[(i-1)*512+(a+0)] +\
                1*image[(i-1)*512+(a+1)] +\
                2*image[(i)*512+(a-1)] +\
                4*image[(i)*512+(a+0)] +\
                2*image[(i)*512+(a+1)] +\
                1*image[(i+1)*512+(a-1)] +\
                2*image[(i+1)*512+(a+0)] +\
                1*image[(i+1)*512+(a+1)]
         ret[i*512+a] = int(summ/16)
   return ret[:]

def isSame(i1,i2):
   for i in i1:
      if i1[i]!=i2[i]:
         return "False"
   return "True"

def blur(img,count):
   con = img[:]
   for i in range(count):
      con = blurify(con)
      printElapsedTime("Blured:"+str(i+1))
   return con

def getGyGx(image,i,a): 
   return ( -1*image[(i-1)*512+(a-1)] +\
        -2*image[(i-0)*512+(a-1)] +\
        -1*image[(i+1)*512+(a-1)] +\
        1*image[(i-1)*512+(a+1)] +\
        2*image[(i+0)*512+(a+1)] +\
        1*image[(i+1)*512+(a+1)] ,\

        1*image[(i-1)*512+(a-1)] +\
         2*image[(i-1)*512+(a+0)] +\
         1*image[(i-1)*512+(a+1)] +\
         -1*image[(i+1)*512+(a-1)] +\
         -2*image[(i+1)*512+(a+0)] +\
         -1*image[(i+1)*512+(a+1)] )

def sobelize(image):
   ret = [[0,0,0,0,0] for i in range(512*512) ]
   for i in range(1,WIDTH-1):
      for a in range(1,HEIGHT-1):
         gx,gy = getGyGx(image,i,a);
         tmp = [sqrt(gx**2+gy**2),theta(gx,gy),0,0,0]
         ret[i*512+a] = tmp
   printElapsedTime('sobel transformation')
   return ret

def canninize(image):
   ret = image[:]
   for i in range(1,WIDTH-1):
      for a in range(1,HEIGHT-1):
         loc = image[i*WIDTH+a]

         l11 = image[(i-1)*WIDTH+a-1][0]
         l12 = image[(i-1)*WIDTH+a][0]
         l13 = image[(i-1)*WIDTH+a+1][0]
         l21 = image[i*WIDTH+a-1][0]
         l22 = image[i*WIDTH+a][0]
         l23 = image[i*WIDTH+a+1][0]
         l31 = image[(i+1)*WIDTH+a-1][0]
         l32 = image[(i+1)*WIDTH+a][0]
         l33 = image[(i+1)*WIDTH+a+1][0]

         if (loc[1]==0 and l21<l22>l23) or (loc[1]==1 and l31<l22>l13) or (loc[1]==2 and l12<l22>l32) or (loc[1]==3 and l11<l22>l33):
            ret[i*WIDTH+a][2] = 1
   printElapsedTime('canny transformation')
   return ret

def fixCellAt(M,row,col):
   if M[row*WIDTH+col][3]==1: return
   M[row*WIDTH+col][3]=1
   if (row>0 and M[(row-1)*WIDTH + col][2] == 1 and M[(row-1)*WIDTH+col][0]>LOW):
      M[(row-1)*WIDTH+col][3] = 1
      M[(row-1)*WIDTH+col][4] = 1
      fixCellAt(M, row-1, col)
   if (row<(HEIGHT-1) and M[(row+1)*WIDTH + col][2] == 1 and M[(row+1)*WIDTH+col][0]>LOW):
      M[(row+1)*WIDTH+col][3] = 1
      M[(row+1)*WIDTH+col][4] = 1
      fixCellAt(M, row+1, col)
   if (col>0 and M[(row)*WIDTH + col-1][2] == 1 and M[(row)*WIDTH+col-1][0]>LOW):
      M[(row)*WIDTH+col-1][3] = 1
      M[(row)*WIDTH+col-1][4] = 1
      fixCellAt(M, row, col-1)
   if (col<(WIDTH-1) and M[(row)*WIDTH + col+1][2] == 1 and M[(row)*WIDTH+col+1][0]>LOW):
      M[(row)*WIDTH+col+1][3] = 1
      M[(row)*WIDTH+col+1][4] = 1
      fixCellAt(M, row, col+1)

def fixAll(image):
   ret = image[:]
   for i in range(len(ret)):
      r = i//WIDTH
      c = i-r*WIDTH
      fixCellAt(ret,r,c)
   return ret
     
def showCanny(image):
   ret = [0 for i in image]
   for i in range(len(image)):
      ret[i] = image[i][2]*255
   return ret

def printMags(image):
   for i in image:
      print(i[0])
   exit()

def showThreshold(image):
   ret = [0 for i in image]
   for i in range(len(image)):
      ret[i] = image[i][4]*255
   return ret

def normalize(image, intensity = 255):
   m = 0
   for i in image:
      m = max(m,i[0])
   return [int(x[0]*intensity/m) for x in image]

def showThresh(image):
   return [255 if i[0]>125 else 0 for i in image]

def showSob(image):
   maxx = -100101
   print(image[0][0])
   for x in image:
      if x[0]>maxx:
         print(x[0])
         maxx = x[0]
   print(maxx)
   ret = [0 for i in range(512*512)]
   for x in range(len(image)):
      ret[x] = int(image[x][0]/maxx)
   return ret

class ImageFrame:
   def __init__(self,pixels):
      self.img = PhotoImage(width = WIDTH, height = HEIGHT)
      for row in range(HEIGHT):
         for col in range(WIDTH):
            num = pixels[row*WIDTH + col]
            if COLORFLAG:
               kolor = '#%02x%02x%02x' % (num[0],num[1],num[2])
            else:
               kolor = '#%02x%02x%02x' % (num,num,num)
            self.img.put(kolor, (col,row))
      c = Canvas(root, width = WIDTH, height= HEIGHT); c.pack()
      c.create_image(0,0,image = self.img, anchor = NW)
      printElapsedTime('displayed image')

def main():
   fileName1 = sys.argv[2] if len(sys.argv)>=3 else './lena.ppm'
   file1 = open(fileName1,'r')
   image = readPixelColorsFromFile(file1)
   #image = blur(image,6)
   image = sobelize(image) 
   image = showThresh(image)
   #image = normalize(image)
   #image = canninize(image)
   #image = fixAll(image)
   #image = showThreshold(image)
   #image = showCanny(image)
   x = ImageFrame(image)
   root.mainloop()

if __name__ == '__main__':main()

