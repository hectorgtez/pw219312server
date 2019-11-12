const controller = {};

controller.list = (req, res) => {
	req.getConnection((err,conn) => {
		conn.query('SELECT * FROM customers',(err, customers) => {
			if(err)
			{
				res.json(err);
			}
			//console.log(customers);
			res.render('customer',{
				data: customers
			});
		});
	});
}

controller.save = (req, res) => {
	console.log(req.body);
	const data = req.body;
	req.getConnection((err,conn) => {
		conn.query('INSERT INTO customers SET ?', [data], (err,customer) => {
			res.redirect('/');
		})
	})
}

controller.delete = (req, res) => {
	//Equivalente a "const id = req.params.id;"
	const { id } = req.params;
	req.getConnection((err,conn) => {
		conn.query('DELETE FORM customers WHERE id = ?',[id], (err,rows) =>{
			res.redirect('/');
		});
	})
}

controller.edit = (req, res) => {
	const { id } = req.params;
	req.getConnection((err,conn) => {
		conn.query('SELECT * FROM costumers WHERE id = ?', [id], (err,customer) => {
			//Llamar pantalla edicion de datos
			res.render('customer-edit', {
				data: customer[0]
			})
		})
	});
}

controller.update = (req, res) => {
	const { id } = req.params;
	const newCostumer = req.body;
	req.getConnection((err,conn) => {
		conn.query('UPDATE customers set ? WHERE id = ?', [newCostumer, id], (err,customer) => {
			res.redirect('/');
		})
	})
}

module.exports = controller;