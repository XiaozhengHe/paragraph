# paragraph

实现了基于node.js的分割文章功能

## input: folder
folder中有待分割的所有文件

## output： output_folder
output_folder中将输出所有folder中文章的分割文件(output_folder文件夹与paragraph.js在同一路径下)

## 可修改参数
每一段的最小字数:minwords，小于20个字，本段将于下一段合并(程序中为20，用户可以自行修改)

## 使用说明
在terminal中键入 node paragraph.js [folder full path]
