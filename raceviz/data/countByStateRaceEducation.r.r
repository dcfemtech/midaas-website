library(plyr)

# Subset data based on our variables of interest
# RAC1P - Recoded detailed race code
# SCHL - Schooling
# ST - State
myvars <- c("RAC1P", "SCHL", "ST")


#Load data
#Load entire data
pus_2014a <- read.csv("csv_pus/ss14pusa.csv", header=TRUE, sep=",")
newdata <- pus_2014a[myvars]
rm(pus_2014a)
pus_2014b <- read.csv("csv_pus/ss14pusb.csv", header=TRUE, sep=",")
newdatab <- pus_2014b[myvars]
rm(pus_2014b)
newdata<-rbind(newdata,newdatab)
rm(newdatab)



##########################################################################
#
# NOTE: (May be optional)
# Use the below only if the above load of entire data is not possible
# due to resource limitation, time constraint, etc.
#
##########################################################################
# Load n records subset by the Python script data_reduce.py instead 
# Change working directory to where subset.csv is located
##########################################################################
subset <- read.csv("subset.csv", header = TRUE, sep = ",")
newdata <- subset[myvars]
rm(subset)
##########################################################################


#Write CSV output file
write.csv(newdata, file="select_subset.csv", row.names=FALSE)

#Create JSON output file
newdata_json <- toJSON(as.list(newdata))

# Map race codes used in PUMS data
# RAC1P 1
# Recoded detailed race code
# 1 .White alone
# 2 .Black or African American alone
# 3 .American Indian alone
# 4 .Alaska Native alone
# 5 .American Indian and Alaska Native tribes specified; or American
# .Indian or Alaska Native, not specified and no other races
# 6 .Asian alone
# 7 .Native Hawaiian and Other Pacific Islander alone
# 8 .Some Other Race alone
# 9 .Two or More Races
#
# Mapping of values used in hackathon: 
#   White(1)    Black(2)    Am. Indian/Native(3, 4 and 5)    
#   Asian(6)    Native Hawaiian(7)    Some Other Race(8)    
#   Two or more races(9)
#
newdata$RAC1P <- as.factor(newdata$RAC1P)
newdata$RAC1P <- revalue(newdata$RAC1P, c("1"="White",
                                    "2"="Black",
                                    "3"="Am. Indian/Native",
                                    "4"="Am. Indian/Native",
                                    "5"="Am. Indian/Native",
                                    "6"="Asian",
                                    "7"="Native Hawaiian",
                                    "8"="Some Other Race",
                                    "9"="Two or more races"))
write.csv(newdata, file="select_subset.csv", row.names=FALSE)

# Map state codes used in PUMS data
# ST 2
# State Code
# 01 .Alabama/AL
# 02 .Alaska/AK
# 04 .Arizona/AZ
# 05 .Arkansas/AR
# 06 .California/CA
# 08 .Colorado/CO
# 09 .Connecticut/CT
# 10 .Delaware/DE
# 11 .District of Columbia/DC
# 12 .Florida/FL
# 13 .Georgia/GA
# 15 .Hawaii/HI
# 16 .Idaho/ID
# 17 .Illinois/IL
# 18 .Indiana/IN
# 19 .Iowa/IA
# 20 .Kansas/KS
# 21 .Kentucky/KY
# 22 .Louisiana/LA
# 23 .Maine/ME
# 24 .Maryland/MD
# 25 .Massachusetts/MA
# 26 .Michigan/MI
# 27 .Minnesota/MN
# 28 .Mississippi/MS
# 29 .Missouri/MO
# 30 .Montana/MT
# 31 .Nebraska/NE
# 32 .Nevada/NV
# 33 .New Hampshire/NH
# 34 .New Jersey/NJ
# 35 .New Mexico/NM
# 36 .New York/NY
# 37 .North Carolina/NC
# 38 .North Dakota/ND
# 39 .Ohio/OH
# 40 .Oklahoma/OK
# 41 .Oregon/OR
# 42 .Pennsylvania/PA
# 44 .Rhode Island/RI
# 45 .South Carolina/SC
# 46 .South Dakota/SD
# 47 .Tennessee/TN
# 48 .Texas/TX
# 49 .Utah/UT
# 50 .Vermont/VT
# 51 .Virginia/VA
# 53 .Washington/WA
# 54 .West Virginia/WV
# 55 .Wisconsin/WI
# 56 .Wyoming/WY
# 72 .Puerto Rico/PR
# 
newdata$ST <- as.factor(newdata$ST)
newdata$ST <- revalue(newdata$ST, c("1"="AL", 
                                    "2"="AK", 
                                    "4"="AZ", 
                                    "5"="AR", 
                                    "6"="CA", 
                                    "8"="CO", 
                                    "9"="CT", 
                                    "10"="DE", 
                                    "12"="FL", 
                                    "13"="GA", 
                                    "15"="HI", 
                                    "16"="ID", 
                                    "17"="IL", 
                                    "18"="IN", 
                                    "19"="IA", 
                                    "20"="KS", 
                                    "21"="KY", 
                                    "22"="LA", 
                                    "23"="ME", 
                                    "24"="MD", 
                                    "25"="MA", 
                                    "26"="MI", 
                                    "27"="MN", 
                                    "28"="MS", 
                                    "29"="MO", 
                                    "30"="MT", 
                                    "31"="NE", 
                                    "32"="NV", 
                                    "39"="OH", 
                                    "40"="OK", 
                                    "41"="OR", 
                                    "42"="PA", 
                                    "47"="TN", 
                                    "48"="TX", 
                                    "49"="UT", 
                                    "50"="VT", 
                                    "51"="VA", 
                                    "53"="WA", 
                                    "55"="WI", 
                                    "56"="WY"))
write.csv(newdata, file="select_subset.csv", row.names=FALSE)

# For hackathon, leave the education code as-is (column name SCHL)
#   SCHL 2
# Educational attainment
# bb .N/A (less than 3 years old)
# 01 .No schooling completed
# 02 .Nursery school, preschool
# 03 .Kindergarten
# 04 .Grade 1
# 05 .Grade 2
# 06 .Grade 3
# 07 .Grade 4
# 08 .Grade 5
# 09 .Grade 6
# 10 .Grade 7
# 11 .Grade 8
# 12 .Grade 9
# 13 .Grade 10
# 14 .Grade 11
# 15 .12th grade - no diploma
# 16 .Regular high school diploma
# 17 .GED or alternative credential
# 18 .Some college, but less than 1 year
# 19 .1 or more years of college credit, no degree
# 20 .Associate's degree
# 21 .Bachelor's degree
# 22 .Master's degree
# 23 .Professional degree beyond a bachelor's degree
# 24 .Doctorate degree

# Get count by State, Race, Education
# Total using sapply - ignore for this effort
#   StateTotal <- sapply (unique(newdata$ST), function (f) length(which(newdata$ST==f)))
countStRaceEdu <- count(newdata, c("ST","RAC1P","SCHL"))
colnames(countStRaceEdu) <- c("State", "Race", "Education", "Count")
write.csv(countStRaceEdu, file="countByStateRaceEducation.csv", row.names=FALSE)

#Count by Race
aggregate(cbind(count = ST) ~ RAC1P, 
          data = newdata, 
          FUN = function(x){NROW(x)})

#Count by State
aggregate(cbind(count = ST) ~ ST, 
          data = newdata, 
          FUN = function(x){NROW(x)})
