const express = require('express')
	  app	  = express()
	  bodyparser = require('body-parser'),
	  mysql   = require('mysql')
	  faker = require('faker') 

app.use(express.static("public"))
app.set("view engine" , "ejs")
app.use(bodyparser.urlencoded({extended:true}))

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'movedb'
});

num = 100000
Supp = 10001
prev = Supp
CNIC = 1001;
add = 0
Pets = ['Cat' , 'Dog' , 'Girrafe' ]
VV = 3
s = 8
populate = ()=>{
	for(i = 0 ; i < 7 ; i ++){
		cust = {
			"Customer_ID" : i ,
			"Customer_Name":faker.fake("{{name.firstName}} {{name.lastName}}"),
			"Gender" : 'Male' ,
			"Address" : `LUMS ${add}`,
			"Contact" : num,
			"Email" : `C${i}@ps.com`
		}
		
		supp = {
			"Supplier_ID" : Supp,
			"Supplier_name" : faker.fake("{{company.companySuffix}} "),
			"Supplier_Type" :faker.fake("{{company.bsNoun}} "),
			"Country" :faker.fake("{{address.country}} "),
			"Contact" : num+10,
			"Email" : `S${i}@ps.com`
		}
		vet = {
			"CNIC" : CNIC + 1 ,
			"Name":faker.fake("{{name.firstName}} {{name.lastName}}"),
			"Salary": num+13,
			"Duty_Timings" : 'Nine to Five',
			"Spec" : "Animals",
			"Address" : `LUMS ${add}`,
			"Contact" : num+3,
			"Email" : `C${i}@ps.com`	
		}
		cage = {
			"Cage_ID": i+2,
			"Type":"LAND",
			"Living_area":'Grass',
			"Temperature": 100,
			"Capacity":100
		}
		food = {
			"Food_Name": `Food ${i}`,
			"Stock_left": i,
			"Expiry_Date": "10-10-01",
			"Price_Kg" : faker.fake("{{random.number}}"),
		}
		Medicine ={
			"Name" : `Panadol ${i}`,
			"Stock_left": i,
			"M_type": 'Tablet'
		}
		pet ={
			"Pet_ID" : i + 100,
			"Type" : Pets[i%VV],
			"Color": faker.fake("{{commerce.color}} "),
			"Gender": 'Female',
			"Age": i%10,
			"Native_Region": faker.fake("{{address.country}} "),
			"Medicine_name": `Panadol ${i}`, 
			"Price" : faker.fake("{{random.number}}"),
			"Supplier_ID": Supp,
			"Cage_ID": i+2 ,
			"Food" : `Food ${i}`
		}
		sale ={
			"Sale_No": i,
			"Customer_ID": Math.floor(Math.random() * i)+0,
			"Pet_ID" : i + 100,
			"Time":`"18-0${Math.floor(Math.random() * 5)+1}-0${Math.floor(Math.random() * 5)+1}"`,
			// "Time":`"01-01-05"`,
			"Amount": Math.floor(Math.random() * 50000)+10000			
		}
		if( i %2 == 0){
			pet["Supplier_ID"] = prev
		}
		addcust(cust)
		addcage(cage)
		addsupp(supp)
		addfood(food)
		// addvet(vet)
		addmed(Medicine)
		addpet(pet)
		addsale(sale)
		prev = Supp
		num++
		add++
		CNIC++
		Supp++
	}
}

conn.connect( err=>{
	if(err){
		console.log('Error Messgae:' + err)
	}else{
		console.log('Connected to Mysql !!')
		// populate()
	}
})
									// _______________QUERIES____________
//Q1// SELECT Count(Type),Type FROM Pets, Sales WHERE Pets.Pet_ID = Sales.Pet_ID GROUP BY Type Order BY COUNT(*) LIMIT 1;
//Q2// SELECT Count(Supplier_ID),Supplier_ID FROM Pets, Sales WHERE Pets.Pet_Id = Sales.Pet_ID GROUP BY Supplier_ID Order BY COUNT(*) DESC LIMIT 1;
//Q3// SELECT SUM(Amount) AS Revenue, Time FROM Sales GROUP BY Time ORDER BY Revenue DESC LIMIT 1;
//Q4// SELECT SUM(Amount) AS Purchases, Customer_ID FROM Sales GROUP BY Customer_ID ORDER BY Purchases DESC LIMIT 1;
//Q5// SELECT COUNT(Food_Name), Food_Name FROM Pet_n_Food GROUP BY Food_Name ORDER BY COUNT(Food_Name) DESC LIMIT 1;
//Q6// SELECT * FROM Sales WHERE Customer_ID = 1;
//Q7// SELECT * FROM Pets WHERE Pet_ID in (SELECT Pet_ID from Sales Where Sale_No = 10 );
//Q8// SELECT Supplier_Id,Type FROM Pets,Sales WHERE Pets.Pet_Id = Sales.Pet_ID AND SUpplier_ID = 10100;
//Q9// SELECT * from Pets where Price between 15000 and 20000;
//10// SELECT * FROM Pets NATURAL JOIN Pet_n_Food  WHERE Food_Name = "Food 1";
map = {
"q1" : 'SELECT Count(Type),Type FROM Pets, Sales WHERE Pets.Pet_ID = Sales.Pet_ID GROUP BY Type Order BY COUNT(*) DESC LIMIT 1;',
"q2" : 'SELECT Count(Supplier_ID),Supplier_ID FROM Pets, Sales WHERE Pets.Pet_Id = Sales.Pet_ID GROUP BY Supplier_ID Order BY COUNT(*) DESC LIMIT 1;',
"q3" : 'SELECT SUM(Amount) AS Revenue, Time FROM Sales GROUP BY Time ORDER BY Revenue DESC LIMIT 1;',
"q4" : 'SELECT SUM(Amount) AS Purchases, Customer_ID FROM Sales GROUP BY Customer_ID ORDER BY Purchases DESC LIMIT 1;',
"q5" : 'SELECT COUNT(Food_Name), Food_Name FROM Pet_n_Food GROUP BY Food_Name ORDER BY COUNT(Food_Name) DESC LIMIT 1;'

}	
app.post('/Q6' , (req , res)=>{
	q6 = `SELECT * FROM Sales WHERE Customer_ID = ${req.body.ID};`
	// console.log(req.body.ID)
	conn.query(q6 , (err , result)=>{
		if(err){
			console.log(err)
		}else{
			res.render('show_customers' , {obj:result} )
		}
	})
})
app.post('/Q7' , (req , res)=>{
	q7 = `SELECT * FROM Pets WHERE Pet_ID in (SELECT Pet_ID from Sales Where Sale_No = ${req.body.ID} );`
	// console.log(req.body.ID)
	conn.query(q7 , (err , result)=>{
		if(err){
			console.log(err)
		}else{
			res.render('show_customers' , {obj:result} )
		}
	})
})
app.post('/Q8' , (req , res)=>{
	q8 = `SELECT Supplier_Id,Type FROM Pets,Sales WHERE Pets.Pet_Id = Sales.Pet_ID AND Supplier_ID = ${req.body.ID};`
	// console.log(req.body.ID)
	conn.query(q8 , (err , result)=>{
		if(err){
			console.log(err)
		}else{
			res.render('show_customers' , {obj:result} )
		}
	})
})
app.post('/Q9' , (req , res)=>{
	// console.log(req.body)
	q9 = `SELECT * from Pets where Price between ${req.body.r1} and ${req.body.r2};`
	conn.query(q9 , (err , result)=>{
		if(err){
			console.log(err)
		}else{
			res.render('show_customers' , {obj:result} )
		}
	})
})
app.post('/Q10' , (req , res)=>{
	q10 = `SELECT Pet_ID,Type,Color,Gender,Age,Cage_ID,Native_Region,Price,Supplier_ID,Food_Name FROM Pets NATURAL JOIN Pet_n_Food  WHERE Food_Name = "${req.body.food}";`
	conn.query(q10 , (err , result)=>{
		if(err){
			console.log(err)
		}else{
			res.render('show_customers' , {obj:result} )
		}
	})
})

app.get('/q:id' , (req , res)=>{
	conn.query(map['q'+req.params.id] , (err , result)=>{
		if(err){
			console.log(err)
		}else{
			res.render('show_customers' , {obj:result} )
		}
	})
})


app.get('/', (req , res)=>{
	res.render('index')
})
app.get('/Home', (req , res)=>{
	// console.log("GET REQUEST MADE")
	res.render('Home')
})

app.get('/admin' , (req , res)=>{
	res.render('admin-panel')
})
addsale = (req)=>{
	sale_sql = `INSERT into Sales (Sale_No , Customer_ID ,Pet_ID ,Time , Amount ) VALUES (${req.Sale_No} , ${req.Customer_ID} , ${req.Pet_ID} , ${req.Time} , ${req.Amount} )`
	conn.query(sale_sql , (err , result)=>{
		if(err){
			console.log(err);
		}
		else{
			console.log('Entry in Sales Table')
		}
	} )
}
app.post('/sale-new' , (req , res)=>{
	addsale(req.body)
	res.render('admin-panel')
})
addcust = (req)=>{
	cust_sql = 'INSERT into Customer (Customer_ID , Customer_Name , Gender) VALUES (' +  req.Customer_ID +','+ '"'+req.Customer_Name +'"' + ',' +  '"'+req.Gender +'"'+ ')'
	c_info_sql = 'INSERT into Customer_Info (Customer_ID , Address) VALUES ('  + req.Customer_ID +','+ '"'+req.Address +'"' + ')'
	c_contact_sql = 'INSERT into Customer_Contact (Customer_ID , Contact , Email) VALUES (' +  req.Customer_ID +','+req.Contact+','+ '"'+req.Email +'"' + ')'
	conn.query(cust_sql , (err , result)=>{
		if(err){
			console.log(err);
		}
		else{
			console.log('Entry in Customer Table')
		}
	} )
	conn.query(c_info_sql , (err , result)=>{
		if(err){
			console.log(err);
		}
		else
			console.log('Entry in Customer_INFO Table')
	} )
	conn.query(c_contact_sql , (err , result)=>{
		if(err){
			console.log(err);
		}
		else
			console.log('Entry in Customer_Contact Table')
	} )

}
app.post('/customer_new' , (req , res) => {
	addcust(req.body)
	res.render('admin-panel')

})
addsupp = (req)=>{
	supp_sql = 'INSERT into Supplier (Supplier_ID , Supplier_name , Supplier_Type , Country) VALUES(' +req.Supplier_ID +',"'+ req.Supplier_name+'"' +',"'+req.Supplier_Type+'"'+',"'+ req.Country+'")' 
	supp_contact_sql = 'INSERT into Supplier_Contact (Supplier_ID , Contact , Email) VALUES(' +req.Supplier_ID +','+ req.Contact +',"'+ req.Email +'")'
	conn.query(supp_sql , (err , result)=>{
		if(err){
			console.log(err);
		}
		else
			console.log('Entry in Supplier Table')
	} )
	conn.query(supp_contact_sql , (err , result)=>{
		if(err){
			console.log(err);
		}
		else
			console.log('Entry in Supplier_Contact Table')
	} )
}
app.post('/supp-new' , (req , res)=>{
	// console.log(req)
	addsupp(req.body)
	res.render('admin-panel')

})
// #bc3f36;
addvet = (req)=>{
	vet_sql = 'INSERT into Veterinay_Staff (CNIC , Name , Salary , Duty_Timings , Specialization) VALUES (' + req.CNIC +',"'+ req.Name + '",' + req.Salary + ',"' + req.Duty_Timings +'","'+ req.Spec + '")'   
	vet_staff_info = 'INSERT into Vet_Staff_Info (V_CNIC ,Address) VALUES (' + req.CNIC +',"'+ req.Address + '")'
	vet_staff_contact = 'INSERT into Vet_Staff_Contact (V_CNIC ,Contact,Email) VALUES (' + req.CNIC +','+ req.Contact+',"'+ req.Email + '")'
	conn.query(vet_sql , (err , result)=>{
		if(err){
			console.log(err);
		}
		else{
			console.log('Entry in Vet Table')
			conn.query(vet_staff_info , (err , result)=>{
				if(err){
					console.log(err);
				}
				else{
					console.log('Entry in Vet_Staff_INFO Table')
					conn.query(vet_staff_contact , (err , result)=>{
						if(err){
							console.log(err);
						}
						else{
							console.log('Entry in Vet_Staff_Contact Table')
						}
					} )
				}
			} )
		}
	} )

}
app.post('/vet-new' , (req , res)=>{
	// console.log(req)
	addvet(req.body)
	res.render('admin-panel')
})
addcashier = (req)=>{
	vet_sql = 'INSERT into Cashier (CNIC , Cashier_Name , Salary , Duty_Timings , Ranks) VALUES (' + req.CNIC +',"'+ req.Cashier_Name + '",' + req.Salary + ',"' + req.Duty_Timings +'","'+ req.Ranks + '")'   
	vet_staff_info = 'INSERT into Cashier_Info (Cashier_CNIC ,Address) VALUES (' + req.CNIC +',"'+ req.Address + '")'
	vet_staff_contact = 'INSERT into Cashier_Contact (Cashier_CNIC ,Contact,Email) VALUES (' + req.CNIC +','+ req.Contact+',"'+ req.Email + '")'
	conn.query(vet_sql , (err , result)=>{
		if(err){
			console.log(err);
		}
		else{
			console.log('Entry in Cashier Table')
			conn.query(vet_staff_info , (err , result)=>{
				if(err){
					console.log(err);
				}
				else{
					console.log('Entry in Cashier_INFO Table')
					conn.query(vet_staff_contact , (err , result)=>{
						if(err){
							console.log(err);
						}
						else{
							console.log('Cashier_Contact Table')
						}
					} )
				}
			} )
		}
	} )
}
app.post('/cashier-new' , (req , res)=>{
	// console.log(req)
	addcashier(req.body)
	res.render('admin-panel')
})
addcstaff = (req)=>{
	vet_sql = 'INSERT into Cleaning_Staff (CNIC , C_Name , Salary , Duty_Timings , Duty_Assigned) VALUES (' + req.CNIC +',"'+ req.C_Name + '",' + req.Salary + ',"' + req.Duty_Timings +'","'+ req.Duty_Assigned + '")'   
	vet_staff_info = 'INSERT into Cleaning_Staff_Info (C_CNIC ,Address) VALUES (' + req.CNIC +',"'+ req.Address + '")'
	vet_staff_contact = 'INSERT into Cleaning_Staff_Contact (C_CNIC ,Contact,Email) VALUES (' + req.CNIC +','+ req.Contact+',"'+ req.Email + '")'
	conn.query(vet_sql , (err , result)=>{
		if(err){
			console.log(err);
		}
		else{
			console.log('Entry in Cleaning_Staff Table')
			conn.query(vet_staff_info , (err , result)=>{
				if(err){
					console.log(err);
				}
				else{
					console.log('Entry in Cleaning_Staff_INFO Table')
					conn.query(vet_staff_contact , (err , result)=>{
						if(err){
							console.log(err);
						}
						else{
							console.log('Cleaning_Staff_Contact Table')
						}
					} )
				}
			} )
		}
	} )
}
app.post('/cstaff-new' , (req , res)=>{
	// console.log(req)
	addcstaff(req.body)
	res.render('admin-panel')
})
addcage = (req)=>{
	cage_sql = 'INSERT into Cage (Cage_ID , Living_area , Temperature , Capacity) VALUES (' + req.Cage_ID +',"'+ req.Living_area + '",' + req.Temperature + ',' + req.Capacity +')'   
	conn.query(cage_sql ,  (err , res)=>{
		if(err){
			console.log(err)
		}
		else{
			console.log('Entry in Cage Table')

		}
	})
}
app.post('/cage-new', (req , res)=>{
	addcage(req.body)
	res.render('admin-panel')
})
addfood =(req)=>{
	cage_sql = 'INSERT into Food (Food_Name , Stock_left , Expiry_Date , Price) VALUES ("' + req.Food_Name +'",'+ req.Stock_left + ',"' + req.Expiry_Date + '",' + req.Price_Kg +')'   
	conn.query(cage_sql ,  (err , res)=>{
		if(err){
			console.log(err)
		}
		else{
			console.log('Entry in Food Table')

		}
	})
}
app.post('/food-new', (req , res)=>{
	addfood(req.body)
	res.render('admin-panel')
})
addmed = (req)=>{
	cage_sql = 'INSERT into Medicine (Name , Stock_left , M_type) VALUES ("' + req.Name +'",'+ req.Stock_left + ',"' + req.M_type + '")'   
	conn.query(cage_sql ,  (err , res)=>{
		if(err){
			console.log(err)
		}
		else{
			console.log('Entry in Medicine Table')

		}
	})
}
app.post('/med-new', (req , res)=>{
	addmed(req.body)
	res.render('admin-panel')
})
addpet =(req)=>{
	pet_sql = 'INSERT into Pets (Pet_ID , Type , Color , Gender , Age ,  Cage_ID , Native_Region , Medicine_name ,  Price , Supplier_ID) VALUES ('+ req.Pet_ID +',"' + req.Type + '","' + req.Color + '","' + req.Gender +'",' + req.Age +',' + req.Cage_ID + ',"' + req.Native_Region + '","' + req.Medicine_name +'",'+ req.Price +','+ req.Supplier_ID +')'
	conn.query(pet_sql , (err , res)=>{
		if(err){
			console.log(err)
		}else{
			console.log('Entry in Pet Table')
			pet_n_food = 'INSERT into Pet_n_Food (Pet_ID ,Food_Name) VALUES (' + req.Pet_ID +',"'+ req.Food + '")'
			conn.query(pet_n_food , (err ,res )=>{
				if(err){
					console.log(err)
				}
				else{
					console.log('Entry in Pet and Food Table')
				}
			})
		}
	})
}
app.post('/pet-new' , (req , res) => {
	addpet(req.body)
	res.render('admin-panel')
})
app.post('/update_table' , (req , res)=>{
	// console.log('Hell')
	update_sql = 'UPDATE ' + req.body.Table + ' SET ' + req.body.old_Attribute + ' = "' + req.body.new_Attribute +'" WHERE ' + req.body.What + ' = "' + req.body.Equal_to + '"'
	conn.query(update_sql , (err , res)=>{
		if(err){
			console.log(err)
		}else{
			console.log("THE VALUES HAVE BEEN UPDATED...")
		}
	})
	res.render('admin-panel')
})
app.post('/del-table', (req , res)=>{
	del_sql = 'DELETE FROM ' +req.body.table +' WHERE ' +req.body.Attribute + ' = ' + '"' + req.body.Val + '"'    
	// console.log(del_sql)
	conn.query(del_sql , (err , res)=>{
		if(err){
			console.log(err)
		}else{
			// if(req.body.table == 'Supplier'){
			// 	sql_2 = `DELETE FROM Supplier_Contact WHERE ${req.body.Attribute} = ${req.body.Val}`
			// 	conn.query(sql_2 , (err , res)=>{
			// 		if(err){
			// 			console.log(err)
			// 		}else{
			// 		}
			// 	})
			// }
			console.log("THE ATTRIBUTE HAS BEEN DELETED...")
		}
	})
	res.render('admin-panel')
})
app.get('/admin/customers' , (req , res)=>{
	c = conn.query("SELECT * FROM Customer" , (err , result , fields)=>{
		if(err){
			console.log(err)
		}
		// console.log(result)
		res.render('show_customers' , {customers:result} )
	})
})
app.get('/:id' , (req , res)=>{
	// console.log(req.params.id)
	q = 'SELECT * FROM ' + req.params.id
	if(req.params.id == 'Customer'){
		q = `SELECT * FROM Customer NATURAL JOIN (Customer_Info NATURAL JOIN Customer_Contact )`
	}
	if(req.params.id == 'Supplier'){
		q = `SELECT * FROM Supplier NATURAL JOIN Supplier_Contact`
	}
	if(req.params.id == 'Veterinay_Staff'){
		q = `SELECT * FROM Veterinay_Staff NATURAL JOIN (Vet_Staff_Info NATURAL JOIN Vet_Staff_Contact )`
	}
	obj = conn.query(q ,(err , result , fields)=>{
		if(err){
			// console.log(err)
		}else{
			// if(req.params.id == 'Customer'){
			// 	console.log('Yes')
			// }
			// console.log(result)
			res.render('show_customers' , {obj:result} )

		}
	}) 
})
app.listen(3000,'0.0.0.0', ()=> console.log('Listining to 3000...'))