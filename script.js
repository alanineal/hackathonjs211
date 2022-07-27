const storageCount = localStorage.getItem('count')

let count = storageCount === null ? 0 : parseInt(storageCount)

console.log(count)

updateCounter(count)

$('.plus').click(function(){
	count++;
	setLocalStorageAndUpdateDOM(count)
})

$('.minus').click(function(){
	count--;
	setLocalStorageAndUpdateDOM(count)
})

$('.reset').click(function(){
	count = 0;
	setLocalStorageAndUpdateDOM(count)
})

function setLocalStorageAndUpdateDOM(count) {
	localStorage.setItem('count', count)
	updateCounter(count)
}

function updateCounter(count){
	$('.counter').text(count);
}

//request cu jquery

$('.get-data').click(function(){

	const url = 'https://reqres.in/api/users' // baza de bate din backend
	
	//get sau post
	$.get(url)
		.done(function(response){
			console.log('done', response.data)//daca url ok
			let rows = ''
			response.data.forEach(user => {
				let tr = '<tr>';
				tr += '<td>' + user.id + '</td>';
				tr += '<td>' + user.first_name + ' ' + user.last_name + '</td>'
				tr += '<td>' + user.email + '</td>';
				tr += '<td>' + user.avatar + '</td>';
				tr += '<td><img src="' + user.avatar + '"></td>';
				tr += '</tr>';
				rows += tr;			
			})
			
			console.log(rows);
			$('#users-table').find('tbody').append(rows)
			$('#users-table').show(); // show() remove la style display:none
		})
		.fail(function(){
			console.log('fail')//daca url gresit
		})
		.always(function(){
			console.log('always') //...
		})

})

function appendDataInTable(){
	
}




















