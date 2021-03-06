/*
var $_GET = {};
location.search.substr(1).split("&").forEach(function(item) {var s = item.split("="), k = s[0], v = s[1] && decodeURIComponent(s[1]); (k in $_GET) ? $_GET[k].push(v) : $_GET[k] = [v]})

var id = $_GET['id'];
*/

loadCreate= function(id) {	
	Create = React.createClass({
	  getInitialState: function() {
		return {data: []};
	  },
	  goIndex: function (){
		index()
	  },
	  handleSubmit: function(e) {
		e.preventDefault();
		name = React.findDOMNode(this.refs.name).value.trim();
		email = React.findDOMNode(this.refs.email).value.trim();
		address = React.findDOMNode(this.refs.address).value.trim();
		state = React.findDOMNode(this.refs.state).value.trim();
		zip = React.findDOMNode(this.refs.zip).value.trim();
		city = React.findDOMNode(this.refs.city).value.trim();
		if (!name) {
		  return;
		}
		// TODO: send request to the server
		var customer = {
			name: name,
			email: email,
			address: address,
			state: state,
			zip: zip,
			city: city
		};
		$.ajax({
		  url: serviceUrl+'insertCustomer',
		  data: {customer: JSON.stringify(customer)},
		  type: 'post',
		  dataType: 'json',
		  cache: false,
		  success: function(data) {
			alert(data.msg)
			index()
			side()
		  }.bind(this),
		  error: function(xhr, status, err) {
			alert(err)
			//console.error(this.props.url, status, err.toString());
		  }.bind(this)
		});
		return;
	  },
	  handleChange: function(event){
		data_array = [];
		for (var i in this.state.data) {
			if(i==event.target.name){
				data_array[i] = event.target.value
			}
			else{
				data_array[i] = this.state.data[i]
			}			
		}
		this.setState({
			data : data_array
		});
	  },
	  render: function(){  
		row = this.state.data;
		return (
		<div>
		<a className="btn btn-default" href="#" onClick={this.goIndex}>&laquo; Index</a>
		<hr />
		<form className="updateForm" onSubmit={this.handleSubmit}>	
		  <table className="table table-bordered table-striped"> 
			<tr>
			  <td>Nama</td>
			  <td><input className="form-control" type="text" ref="name" name="name" value={row.name} onChange={this.handleChange} /></td>
			</tr>  
			<tr>
			  <td>Email</td>
			  <td><input className="form-control" type="text" ref="email" name="email" value={row.email} onChange={this.handleChange} /></td>
			</tr>
			<tr>
			  <td>Address</td>
			  <td><input className="form-control" type="text" ref="address" name="address" value={row.address} onChange={this.handleChange} /></td>
			</tr>
			<tr>
			  <td>State</td>
			  <td><input className="form-control" type="text" ref="state" name="state" value={row.state} onChange={this.handleChange} /></td>
			</tr>
			<tr>
			  <td>Zip</td>
			  <td><input className="form-control" type="text" ref="zip" name="zip" value={row.zip} onChange={this.handleChange} /></td>
			</tr>
			<tr>
			  <td>Kota</td>
			  <td><input className="form-control" class="input" type="text" ref="city" name="city" value={row.city} onChange={this.handleChange} /></td>
			</tr>
			<tr>
			  <td></td>
			  <td><input className="btn btn-primary" type="submit" value="Create" /></td>
			</tr>
		  </table>
		</form>  
		 </div>
		)
	  }
	})
	return Create;
}