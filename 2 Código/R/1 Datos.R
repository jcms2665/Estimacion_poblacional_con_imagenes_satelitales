
library(plm);library(readxl); library(foreign);library(questionr);library(car);library(dplyr);library(tidyverse); library(kableExtra);library(Metrics); library(lmtest);library(data.table)

rm(list=ls()); graphics.off(); options(warn=-1) 

setwd("C:/Users/Ciencias de Datos-2/OneDrive - El Colegio de México A.C/1 Proyectos/2023/75 Census_2/1 Datos/")

p=read_excel("datos.xlsx", sheet = "poblacion") %>% data.frame()
pob=melt(setDT(p), id.vars = c("nomgeo"), variable.name = "year")
names(pob)=c("nomgeo","year","poblacion")


l=read_excel("datos.xlsx", sheet = "luces") %>% data.frame()
l <- l[,!names(l) %in% c("mun")]
luces=melt(setDT(l), id.vars = c("nomgeo"), variable.name = "year")
names(luces)=c("nomgeo","year","luces")


a=read_excel("datos.xlsx", sheet = "areas_sin_duplicados") %>% data.frame()
a <- a[,!names(a) %in% c("mun_censo","mun")]
area=melt(setDT(a), id.vars = c("nomgeo"), variable.name = "year")
names(area)=c("nomgeo","year","area")


censo=read_excel("datos.xlsx", sheet = "censo2020") %>% data.frame()
censo <- censo[,!names(censo) %in% c("Municipio")]

rm("p","l","a")



table(area$year)
table(luces$year)
table(pob$year)

base=left_join(area, luces, by = c('nomgeo', 'year')) 
base=left_join(base, pob, by = c('nomgeo', 'year')) 

base=left_join(base, censo, by = c('nomgeo', 'year')) 

write.csv(base,"base_modelo.csv")


