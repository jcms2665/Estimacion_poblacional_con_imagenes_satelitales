# Load necessary packages


library(plm);library(readxl); library(foreign);library(questionr);library(car);library(dplyr);library(tidyverse); library(kableExtra);library(Metrics); library(lmtest)

rm(list=ls()); graphics.off(); options(warn=-1) 

setwd("C:/Users/jcmartinez/OneDrive - El Colegio de México A.C/1 Proyectos/2023/75 Census_2/1 Datos/")
datos_original=read.csv("base_modelo.csv") %>% data.frame()
g=read_excel("nomgeo.xlsx")$nomgeo

y=c(2020,2021,2022)
ldf=l1=l2=l3=r1=r2=list()

w=1
k=1
for (w in 1:3){
  
  nuevo_0=datos_original %>% filter(year==y[w]) %>% data.frame()
  
  for (k in 1:length(g)){
    
    datos=datos_original %>% filter(year<2020 & nomgeo==g[k]) %>% data.frame()
    nuevo_1=datos_original %>% filter(year==y[w] & nomgeo==g[k]) %>% data.frame()
    nuevo=nuevo_1[,c(3,4)]
    model <- lm(poblacion ~ area + luces, data = datos)
    ldf[[k]]=predict(model, nuevo) %>% as.data.frame()
    l1[[k]]=summary(model)$adj.r.squared
    l2[[k]]=shapiro.test(rstandard(model))$p.value
    l3[[k]]=as.numeric(bptest(model)$p.value)
  }
  a<-do.call(rbind, ldf)
  a1<-do.call(rbind, l1) %>% data.frame();a2<-do.call(rbind, l2) %>% data.frame();a3<-do.call(rbind, l3) %>% data.frame()
  
  modelo_sup=cbind(a1,a2,a3)
  names(modelo_sup)=c("r2_ajustado","normaliad","homocedasticidad")
  
  
  nuevo_1=cbind(nuevo_0,a)
  names(nuevo_1)=c("nomgeo", "year", "area","luces","proyecciones",   "censo_2020", "prediccion")
  
  nuevo_1$prediccion=round(nuevo_1$prediccion,0)
  
  poblacion=nuevo_1 %>% select("nomgeo", "proyecciones","censo_2020", "prediccion")
  #View(poblacion)
  
  
  poblacion=poblacion %>% mutate(d=abs((1-(censo_2020/prediccion))*100))
  
  poblacion$d=poblacion$d %>% round(2)
  
  #
  modelo_sup$year=y[w]
  poblacion$year=y[w]
  
  r1[[w]]=modelo_sup
  r2[[w]]=poblacion
  
}
b1=do.call(rbind, r1)
b2=do.call(rbind, r2)
rm("a","a1","a2","a3","ldf","l1","l2","l3","nuevo_0","nuevo","model","nuevo_1","datos", "modelo_sup","poblacion","r1","r2")

# use reshape() to convert to wide format
proyeccion=reshape(b2[,c(1,4,6)], idvar = "nomgeo", timevar = "year", direction = "wide")

evaluacion=b2 %>% filter(year==2020)

mae(evaluacion$censo_2020, evaluacion$prediccion)

apply(evaluacion[,2:4], 2,sum)


setwd("C:/Users/Ciencias de Datos-2/OneDrive - El Colegio de México A.C/1 Proyectos/2023/75 Census_2/3 Resultados")

write.csv(proyeccion, "proyeccion.csv")
write.csv(evaluacion, "evaluacion.csv")




#-----------------------------------------

