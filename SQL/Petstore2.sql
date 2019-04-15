CREATE DATABASE IF NOT EXISTS `movedb`;
USE `movedb`;


# Table structure for table 'Cage'
#

DROP TABLE IF EXISTS `Cage`;

CREATE TABLE `Cage` (
  `Cage_ID` INTEGER NOT NULL, 
  `Living_area` VARCHAR(255), 
  `Temperature` INTEGER DEFAULT 22, 
  `Capacity` INTEGER DEFAULT 0, 
  UNIQUE (`Cage_ID`),
  PRIMARY KEY (`Cage_ID`)
);

#
# Dumping data for table 'Cage'
#

# 0 records

#
# Table structure for table 'Cashier'
#

DROP TABLE IF EXISTS `Cashier`;

CREATE TABLE `Cashier` (
  `CNIC` INTEGER NOT NULL DEFAULT 0, 
  `Cashier_Name` VARCHAR(255) NOT NULL, 
  `Salary` DECIMAL(19,4) NOT NULL DEFAULT 0, 
  `Duty_Timings` VARCHAR(255) NOT NULL, 
  `Ranks` VARCHAR(255),
  UNIQUE (`CNIC`), 
  PRIMARY KEY (`CNIC`)
);

#
# Dumping data for table 'Cashier'
#

# 0 records

#
# Table structure for table 'Cashier_Contact'
#

DROP TABLE IF EXISTS `Cashier_Contact`;

CREATE TABLE `Cashier_Contact` (
  `Cashier_CNIC` INTEGER NOT NULL DEFAULT 0, 
  `Contact` INTEGER NOT NULL DEFAULT 0, 
  `Email` VARCHAR(255), 
  PRIMARY KEY (`Cashier_CNIC`),
  FOREIGN KEY (`Cashier_CNIC`) REFERENCES Cashier(`CNIC`)
);

#
# Dumping data for table 'Cashier_Contact'
#

# 0 records

#
# Table structure for table 'Cashier_Info'
#

DROP TABLE IF EXISTS `Cashier_Info`;

CREATE TABLE `Cashier_Info` (
  `Cashier_CNIC` INTEGER NOT NULL DEFAULT 0, 
  `Address` VARCHAR(50) NOT NULL, 
  PRIMARY KEY (`Cashier_CNIC`),
  FOREIGN KEY (`Cashier_CNIC`) REFERENCES Cashier(`CNIC`)
);

#
# Dumping data for table 'Cashier_Info'
#

# 0 records

#
# Table structure for table 'Cleaning_Staff'
#

DROP TABLE IF EXISTS `Cleaning_Staff`;

CREATE TABLE `Cleaning_Staff` (
  `CNIC` INTEGER NOT NULL DEFAULT 0, 
  `C_Name` VARCHAR(50) NOT NULL, 
  `Salary` DECIMAL(19,4) DEFAULT 0, 
  `Duty_Timings` VARCHAR(255) DEFAULT '=\"9:00-7:00\"', 
  `Duty_Assigned` VARCHAR(255), 
  UNIQUE (`CNIC`),
  PRIMARY KEY (`CNIC`)
);
#
# Dumping data for table 'Cleaning_Staff'
#

# 0 records

#
# Table structure for table 'Cleaning_Staff_Contact'
#

DROP TABLE IF EXISTS `Cleaning_Staff_Contact`;

CREATE TABLE `Cleaning_Staff_Contact` (
  `C_CNIC` INTEGER NOT NULL DEFAULT 0, 
  `Contact` INTEGER NOT NULL DEFAULT 0, 
  `Email` VARCHAR(255), 
  PRIMARY KEY (`C_CNIC`),
  FOREIGN KEY (`C_CNIC`) REFERENCES Cleaning_Staff(`CNIC`)
);
#
# Dumping data for table 'Cleaning_Staff_Contact'
#

# 0 records

#
# Table structure for table 'Cleaning_Staff_Info'
#

DROP TABLE IF EXISTS `Cleaning_Staff_Info`;

CREATE TABLE `Cleaning_Staff_Info` (
  `C_CNIC` INTEGER NOT NULL DEFAULT 0, 
  `Address` VARCHAR(50) NOT NULL, 
  PRIMARY KEY (`C_CNIC`),
  FOREIGN KEY (`C_CNIC`) REFERENCES Cleaning_Staff(`CNIC`)
);

#
# Dumping data for table 'Cleaning_Staff_Info'
#

# 0 records

#
# Table structure for table 'Customer'
#

DROP TABLE IF EXISTS `Customer`;

CREATE TABLE `Customer` (
  `Customer_ID` INTEGER NOT NULL, 
  `Customer_Name` VARCHAR(255) NOT NULL, 
  `Gender` VARCHAR(255) NOT NULL, 
  PRIMARY KEY (`Customer_ID`)
);
#
# Dumping data for table 'Customer'
#

# 0 records

#
# Table structure for table 'Customer_Contact'
#

DROP TABLE IF EXISTS `Customer_Contact`;

CREATE TABLE `Customer_Contact` (
  `Customer_ID` INTEGER NOT NULL DEFAULT 0, 
  `Contact` INTEGER NOT NULL DEFAULT 0, 
  `Email` VARCHAR(255), 
  PRIMARY KEY (`Customer_ID`),
  FOREIGN KEY (`Customer_ID`) REFERENCES Customer(`Customer_ID`)
  ON DELETE CASCADE
);

#
# Dumping data for table 'Customer_Contact'
#

# 0 records

#
# Table structure for table 'Customer_Info'
#

DROP TABLE IF EXISTS `Customer_Info`;

CREATE TABLE `Customer_Info` (
  `Customer_ID` INTEGER NOT NULL DEFAULT 0, 
  `Address` LONGTEXT NOT NULL, 
  PRIMARY KEY (`Customer_ID`),
  FOREIGN KEY (`Customer_ID`) REFERENCES Customer(`Customer_ID`)
);

#
# Dumping data for table 'Customer_Info'
#

# 0 records

#
# Table structure for table 'Food'
#

DROP TABLE IF EXISTS `Food`;

CREATE TABLE `Food` (
  `Food_Name` VARCHAR(255) NOT NULL, 
  `Stock_left` INTEGER DEFAULT 0, 
  `Expiry_Date` DATETIME, 
  `Price` DECIMAL(19,4) DEFAULT 0, 
  UNIQUE (`Food_Name`),
  PRIMARY KEY (`Food_Name`)
);

#
# Dumping data for table 'Food'
#

# 0 records

#
# Table structure for table 'Medicine'
#

DROP TABLE IF EXISTS `Medicine`;

CREATE TABLE `Medicine` (
  `Name` VARCHAR(255) NOT NULL, 
  `Stock_left` INTEGER DEFAULT 0, 
  `M_type` VARCHAR(255), 
  UNIQUE (`Name`),
  PRIMARY KEY (`Name`)
);

#
# Dumping data for table 'Medicine'
#

# 0 records

#
# Table structure for table 'Pet_n_Food'
#

DROP TABLE IF EXISTS `Pet_n_Food`;

CREATE TABLE `Pet_n_Food` (
  `Pet_ID` INTEGER, 
  `Food_Name` VARCHAR(255) NOT NULL
 # CONSTRAINT FK_PET_FOR_FOOD FOREIGN KEY (`Pet_ID`) REFERENCES Pets(`Pet_ID`),
  #CONSTRAINT FK_PET_FOOD FOREIGN KEY (`Food_Name`) REFERENCES Food(`Food_Name`)
);
#
# Dumping data for table 'Pet_n_Food'
#

# 0 records

#
# Table structure for table 'Pets'
#

DROP TABLE IF EXISTS `Pets`;

CREATE TABLE `Pets` (
  `Pet_ID` INTEGER NOT NULL, 
  `Type` VARCHAR(255) NOT NULL, 
  `Color` VARCHAR(255), 
  `Gender` VARCHAR(255) NOT NULL, 
  `Age` INTEGER DEFAULT 0, 
  `Cage_ID` INTEGER DEFAULT 0, 
  `Native_Region` VARCHAR(255), 
  `Medicine_name` VARCHAR(255), 
  `Price` INTEGER NOT NULL DEFAULT 0, 
  `Supplier_ID` INTEGER NOT NULL DEFAULT 0, 
  INDEX (`Cage_ID`), 
  UNIQUE (`Pet_ID`), 
  PRIMARY KEY (`Pet_ID`), 
  INDEX (`Supplier_ID`),
  CONSTRAINT FK_CAGE FOREIGN KEY (`Cage_ID`) REFERENCES Cage(`Cage_ID`)
  ON DELETE CASCADE
  # FOREIGN KEY (`Medicine_name`) REFERENCES Medicine(`Name`)
  # CONSTRAINT FK_SUPPLIER FOREIGN KEY (`Supplier_ID`) REFERENCES Supplier(`Supplier_ID`)
);

#
# Dumping data for table 'Pets'
#

# 0 records

#
# Table structure for table 'Sales'
#

DROP TABLE IF EXISTS `Sales`;

CREATE TABLE `Sales` (
  `Sale_No` INTEGER NOT NULL, 
  `Customer_ID` INTEGER NOT NULL DEFAULT 0, 
  `Pet_ID` INTEGER NOT NULL DEFAULT 0, 
  `Time` DATE NOT NULL, 
  `Amount` DECIMAL(19,4) NOT NULL DEFAULT 0, 
  INDEX (`Customer_ID`), 
  INDEX (`Pet_ID`), 
  PRIMARY KEY (`Sale_No`)
  #CONSTRAINT FK_CUSTOMER_SALES FOREIGN KEY (`Customer_ID`) REFERENCES Customer(`Customer_ID`),
  #CONSTRAINT FK_PET_SALES FOREIGN KEY (`Pet_ID`) REFERENCES Pets(`Pet_ID`)
);

#
# Dumping data for table 'Sales'
#

# 0 records

#
# Table structure for table 'Supplier'
#

DROP TABLE IF EXISTS `Supplier`;

CREATE TABLE `Supplier` (
  `Supplier_ID` INTEGER NOT NULL, 
  `Supplier_name` VARCHAR(255) NOT NULL, 
  `Supplier_Type` VARCHAR(255), 
  `Country` VARCHAR(255) NOT NULL, 
  UNIQUE (`Supplier_ID`),
  PRIMARY KEY (`Supplier_ID`)
);

#
# Dumping data for table 'Supplier'
#

# 0 records

#
# Table structure for table 'Supplier_Contact'
#

DROP TABLE IF EXISTS `Supplier_Contact`;

CREATE TABLE `Supplier_Contact` (
  `Supplier_ID` INTEGER NOT NULL DEFAULT 0, 
  `Contact` INTEGER NOT NULL DEFAULT 0, 
  `Email` VARCHAR(255), 
  PRIMARY KEY (`Supplier_ID`),
  FOREIGN KEY (`Supplier_ID`) REFERENCES Supplier(`Supplier_ID`)
  ON DELETE CASCADE
);

#
# Dumping data for table 'Supplier_Contact'
#

# 0 records

#
# Table structure for table 'Vet_Staff_Contact'
#

DROP TABLE IF EXISTS `Vet_Staff_Contact`;

CREATE TABLE `Vet_Staff_Contact` (
  `V_CNIC` INTEGER NOT NULL DEFAULT 0, 
  `Contact` INTEGER NOT NULL DEFAULT 0, 
  `Email` VARCHAR(255), 
  PRIMARY KEY (`V_CNIC`)
  #FOREIGN KEY (`V_CNIC`) REFERENCES Veterinay_Staff(`CNIC`)
);

#
# Dumping data for table 'Vet_Staff_Contact'
#

# 0 records

#
# Table structure for table 'Vet_Staff_Info'
#

DROP TABLE IF EXISTS `Vet_Staff_Info`;

CREATE TABLE `Vet_Staff_Info` (
  `V_CNIC` INTEGER NOT NULL DEFAULT 0, 
  `Address` VARCHAR(50) NOT NULL, 
  PRIMARY KEY (`V_CNIC`)
 # FOREIGN KEY (`V_CNIC`) REFERENCES Veterinay_Staff(`CNIC`)
);

#
# Dumping data for table 'Vet_Staff_Info'
#

# 0 records

#
# Table structure for table 'Veterinay Staff'
#

DROP TABLE IF EXISTS `Veterinay_Staff`;

CREATE TABLE `Veterinay_Staff` (
  `CNIC` INTEGER NOT NULL DEFAULT 0, 
  `Name` VARCHAR(50) NOT NULL, 
  `Salary` DECIMAL(19,4) DEFAULT 0, 
  `Duty_Timings` VARCHAR(255) DEFAULT '=\"9:00-9:00\"', 
  `Specialization` VARCHAR(255), 
  UNIQUE (`CNIC`),
  PRIMARY KEY (`CNIC`)
);


#
# Dumping data for table 'Veterinay Staff'
#

# 0 records

  -- ALTER TABLE `Pet_n_Food` 

  -- ADD CONSTRAINT FK_PET_FOR_FOOD FOREIGN KEY (`Pet_ID`) REFERENCES Pets(`Pet_ID`),
  -- ADD CONSTRAINT FK_PET_FOOD FOREIGN KEY (`Food_Name`) REFERENCES Food(`Food_Name`);

  -- ALTER TABLE `Sales` 
  -- ADD CONSTRAINT FK_CUSTOMER_SALES FOREIGN KEY (`Customer_ID`) REFERENCES Customer(`Customer_ID`),
  -- ADD CONSTRAINT FK_PET_SALES FOREIGN KEY (`Pet_ID`) REFERENCES Pets(`Pet_ID`);

  -- ALTER TABLE `Pets` 
  -- ADD CONSTRAINT FK_CAGE FOREIGN KEY (`Cage_ID`) REFERENCES Cage(`Cage_ID`),
  -- ADD CONSTRAINT FK_SUPPLIER FOREIGN KEY (`Supplier_ID`) REFERENCES Supplier(`Supplier_ID`);