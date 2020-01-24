import React from 'react'

import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'

import './FamilyAgenda.css'
import './utils/fonts/Hansief.ttf'

let startSelect
let endSelect
let isDragging = false
let element = null
let element2 = null
let helper = null
let hours = []
let mouse = {
	x: 0,
	y: 0,
	startX: 0,
	startY: 0,
}
let item = []

export default class FamilyAgenda extends React.Component {

	state = {
		items: [],
		selected: [],
		weekIndex: moment().isoWeek(),
		year: moment().year(),
		active: '',
		width: 0,
		height: 0,
		showWindow: false,
		allChildren: [],
		nameChild: [],
		nameChildOthers: [],
		countMyChild: 0,
		countNotMyChild: 0,
		countTimeSlot: 0,
		arrayChildren: [],
		showMyChildName: [],
		showOthersChildName: [],
		calendarChild : '',
		colorState: [],
		minutes: [],
		time: '',
		setTime: false,
		
	}

	/* -------- Define Mouse Position -------- */

	setMousePosition = e => {
		let yScroll = window.scrollY
		let ev = e || window.event //Moz || IE
		if (ev.pageX) {
			//Moz
			mouse.x = ev.pageX + window.pageXOffset
			mouse.y = ev.pageY + window.pageYOffset
		} else if (ev.clientX) {
			//IE
			mouse.x = ev.clientX + document.body.scrollLeft
			mouse.y = ev.clientY + document.body.scrollTop
		}
	}

	/* -------- Removing Selections if exist -------- */

	removeSelection = () => {
		let oldSelect = document.getElementsByClassName(
			'calendarCell_selected',
		)
		for (let i = oldSelect.length - 1; i >= 0; --i) {
			if (oldSelect[i]) {
				oldSelect[i].classList.remove('calendarCell_selected')
			}
		}
	}

	removeRectangle = () => {
		let oldRect = document.getElementsByClassName('rectangle')
		let oldHelper = document.getElementsByClassName(
			'helper-reactangle',
		)
		for (let i = oldRect.length - 1; i >= 0; --i) {
			if (oldRect[i]) {
				oldRect[i].remove()
			}
		}
		for (let i = oldHelper.length - 1; i >= 0; --i) {
			if (oldHelper[i]) {
				oldHelper[i].remove()
			}
		}
	}

	/* -------- Push first and last selected cells to the state when selection is over -------- */

	handleCellSelection = item => {
		this.setState({ selected: [item] })
	}

	/* Convert moment date to day */

	findWeekDay = (date) => { /*To convert moment date -> day, array can be customized */
		let convertDate = new Date(date);
		let getDay = convertDate.getDay();
		let weekday = [7, 1, 2, 3, 4, 5, 6] //["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
		let findTheDay = weekday[getDay];
		return findTheDay
	}

	validateSelect = () => {
		if (this.state.items.length > 0) {
			let items = JSON.parse(localStorage.getItem('items'))
			if (items === null) {
				items = [
					{ day: this.findWeekDay(this.state.items[0]), start: this.state.items[0], end: this.state.items[1] }
				]
			} else {
				if (this.state.items[0] != this.state.items[1]) {
					items.push({ day: this.findWeekDay(this.state.items[0]), start: this.state.items[0], end: this.state.items[1] })
				}
			}

			// alert(`Création d'une plage horaire de ${this.state.items[0]} à ${this.state.items[1]}`)
			localStorage.setItem('items', JSON.stringify(items))
			this.setState({ items: [] })

			// __________________ CALCULS DES DATES ________________

			//   let date1 = moment(this.state.items[0])

			//   let minutes = this.state.minutes
			//   let date2 = moment(this.state.items[1])
			//   let difference = date2.diff(date1, 'minutes')
			//   minutes.push(difference)

			//   this.setState({ minutes: difference })
			//   this.setState({ minutes: minutes })

			//   let total = minutes.reduce((a, b) => a + b, 0)

			//   // _____ CALCULS MINUTES EN HEURES

			//   let time = total / 60
			//   let min = (time % 1) * 60
			//   let hours = Math.trunc(total / 60)

			//   let realTime = hours + ' heures et ' + min + ' min'
			//   this.setState({ time: realTime, setTime: true })
			//   console.log('TIME', realTime) */
			// } else {
			return null
		}
	}


	/* -------- Add children informations to localstorage -------- */

	addChild = () => {
		let items = JSON.parse(localStorage.getItem('items'));
		let myChild = JSON.parse(localStorage.getItem('myChild'));
		let notMyChild = JSON.parse(localStorage.getItem('notMyChild'));
		let arrayChildren = JSON.parse(localStorage.getItem('allChildren'));
		let i = this.state.countMyChild;
		let j = this.state.countNotMyChild;
		let countId = this.state.countTimeSlot;
		let nameChild = this.state.nameChild;
		let nameChildOthers = this.state.nameChildOthers;
		let arrayObject = [];
		let childCalendar;
		
		//let arrayChildren = this.state.arrayChildren

		if (i < myChild.length) { //look at the size of my Children array

			if (items.length > 0) { // if the user selected some timeslot
				nameChild = [...nameChild, myChild[i]]
				
				
				for (let k = 0; k < items.length; k++) { // loop to generate one info object per time slot per child
					let arrayTr = []
					let objChild = {}

					// here to find relative infos in items

					let findStart = (entry) => {
						if (entry.start != null) {
							return entry.start
						}
					};
					let findEnd = (entry) => {
						if (entry.end != null) {
							return entry.end
						}
					};
					let findDay = (entry) => {
						if (entry.day != null) {
							return entry.day
						}
					};
					arrayTr.push(findStart(items[k]))  
					arrayTr.push(findEnd(items[k])) 
					arrayTr.push('A') 
					arrayTr.push(findDay(items[k]))  
					arrayTr.push(i + 1) 
					arrayTr.push(countId + 1) 
					objChild = { start: arrayTr[0], end: arrayTr[1], famille: arrayTr[2], jour: arrayTr[3], enfant: arrayTr[4], id: arrayTr[5] }
					arrayObject.push(objChild) 
					countId++ 
				};
				console.log("HEY", childCalendar)
				arrayChildren.push(...arrayObject)
				localStorage.setItem('allChildren', JSON.stringify(arrayChildren));
				localStorage.setItem('items', JSON.stringify([]));
				i++;
				childCalendar = myChild[i]
				this.setState({ countMyChild: i })
				this.setState({ countTimeSlot: countId })
				this.setState({showMyChildName : nameChild})
				this.setState({calendarChild: childCalendar})
				this.resetCalendar()
			} else {
				alert('Pas de plages horaires sélectionnées pour cet enfant')
			};

		} else {
			if (j < notMyChild.length) { // I look at the other children
				if (items.length > 0) {
					nameChildOthers = [...nameChildOthers, notMyChild[j]]
					childCalendar = notMyChild[j+1]
					for (let k = 0; k < items.length; k++) { // loop to generate one info object per time slot per child
						let arrayTr = []
						let objChild = {}
						
						let findStart = (entry) => {
							if (entry.start != null) {
								return entry.start
							}
						};
						let findEnd = (entry) => {
							if (entry.end != null) {
								return entry.end
							}
						};
						let findDay = (entry) => {
							if (entry.day != null) {
								return entry.day
							}
						};
						arrayTr.push(findStart(items[k])) 
						arrayTr.push(findEnd(items[k])) 
						arrayTr.push('B') 
						arrayTr.push(findDay(items[k]))  
						arrayTr.push(i + 1)  
						arrayTr.push(countId + 1) 
						objChild = { start: arrayTr[0], end: arrayTr[1], famille: arrayTr[2], jour: arrayTr[3], enfant: arrayTr[4], id: arrayTr[5] }
						arrayObject.push(objChild) 
						countId++ 
					};
					arrayChildren.push(...arrayObject)
					localStorage.setItem('allChildren', JSON.stringify(arrayChildren));
					localStorage.setItem('items', JSON.stringify([]));
					i++;
					j++;
					childCalendar =  notMyChild[j]
					this.setState({ countMyChild: i })
					this.setState({ countNotMyChild: j })
					this.setState({ countTimeSlot: countId })
					this.setState({showOthersChildName : nameChildOthers})
					this.setState({calendarChild: childCalendar})
					this.resetCalendar()
				} else {
					alert('Pas de plages horaires sélectionnées pour cet enfant')
				}

			} else {
				alert("Il n'y a plus d'enfant à rajouter")
			}
		}


	}

	/* -------- reset-------- */

	resetCalendar = () => {
		localStorage.setItem('items', JSON.stringify([]))
		this.setState({ items: [] })
	}

	wipeLastSelect = () => {
		let itemState = this.state.items
		let items = JSON.parse(localStorage.getItem('items'))
		items.pop()
		itemState.pop()

		localStorage.setItem('items', JSON.stringify(items))
		this.setState({ itemState: itemState })

		// localStorage.setItem('items', JSON.stringify([]))
		// this.setState({ items: [] })
	}

	resetCalendarPage = () => {
		localStorage.setItem('items', JSON.stringify([]))
		localStorage.setItem('items2', JSON.stringify([]))
		this.setState({ items: [] })
	}
	/* -------- Start Selection on click -------- */

	handleMouseClick = (cell, bypass) => {
		if (typeof cell != 'string' && cell.tagName) {
			let dt = moment(cell.innerText, ['h:mm A']).format('HH')
			let old = parseInt(dt)
			let now = new Date()
			let newdate = new Date(
				now.getFullYear(),
				now.getMonth(),
				now.getDate(),
				old + 1,
				0,
			)
			let mom = newdate
				.toISOString()
				.substring(0, newdate.toISOString().length - 5)
			if (this.handleCellSelection()) {
				return this.handleCellSelection(mom, bypass)
			}
		}
		if (this.handleCellSelection()) {
			this.handleCellSelection(cell, bypass)
		}
	}

	handleAllClickStarts = (e, n) => {
		let yScroll = window.scrollY
		let isMouseDown = true
		this.removeSelection()

		if (
			e.target.classList.contains('calendarCell') &&
			!e.target.classList.contains('time') &&
			!isDragging
		) {
			startSelect = e.target.id
			//   this.handleMouseClick(e.target.id)
			mouse.startX = mouse.x
			mouse.startY = mouse.y
			element = document.createElement('div')
			element.className = 'rectangle'
			element.style.left = mouse.x + 'px'
			element.style.top = mouse.y + 'px'
			document.body.appendChild(element)
		}
	}

	handleAllClickEnds = (e, n) => {
		this.handleMouseClick(e.target.id)
		endSelect = e.target.id
		this.removeRectangle()
		if (startSelect && endSelect) {
			return this.getSelection(startSelect, endSelect)
		}
	}

	/* -------- define Selection and push the first and last cells to the state -------- */

	handleRangeSelection = selected => {
		if (this.state.selected.length > 0) {
			this.setState({ selected: selected, showCtrl: true })
			this.setState({ items: selected, selected: [] })
		} else {
			return null
		}
	}

	getSelection = (start, end) => {
		let strt = moment(start)
		let endd = moment(end)
		let arr = endd.diff(strt) > 0 ? [start, end] : [end, start]
		this.handleRangeSelection(arr, end)
	}

	handleMouseOver = e => {
		let yScroll = window.scrollY
		this.setMousePosition(e)
		if (e.buttons === 0) {
			return false
		}
		e.preventDefault ? e.preventDefault() : (e.returnValue = false)
		this.removeSelection()
		if (element) {
			element.style.width = Math.abs(mouse.x - mouse.startX) + 'px'
			element.style.height = Math.abs(mouse.y - mouse.startY) + 'px'
			element.style.left =
				mouse.x - mouse.startX < 0
					? mouse.x + 'px'
					: mouse.startX + 'px'
			element.style.top =
				mouse.y - mouse.startY < 0
					? Math.abs(mouse.y) - yScroll + 'px'
					: mouse.startY - yScroll + 'px'
		}
	}

	/* -------- Create a new Div from selected Cells to highlight them -------- */

	addRectangleClassName = () => {
		let yScroll = window.scrollY
		let first = document.getElementById(this.state.items[0])
		let last = document.getElementById(this.state.items[1])
		let horiz = first.getBoundingClientRect()
		let vert = last.getBoundingClientRect()
		element = document.createElement('div')
		element.className = 'rectangle'
		element.style.width = horiz.right - horiz.left - 5 + 'px'
		element.style.height = vert.bottom - horiz.top + 'px'
		element.style.left = horiz.left + 'px'
		element.style.top = horiz.top + yScroll + 'px'
		document.body.appendChild(element)
	}

	createSelectionDiv = () => {
		if (this.state.items.length > 0) {
			if (document.getElementsByClassName('rectangle')) {
				let old = document.getElementsByClassName('rectangle')
				for (let i = old.length - 1; i >= 0; --i) {
					if (old[i]) {
						old[i].remove()
					}
				}
			} else {
				return null
			}
		} else {
			if (document.getElementsByClassName('slot')) {
				let old = document.getElementsByClassName('slot')
				for (let i = old.length - 1; i >= 0; --i) {
					if (old[i]) {
						old[i].remove()
					}
				}
			} else {
				return null
			}
		}
	}

	/* -------- Create new Div from selection in local storage -------- */

	getSelect = () => {
		let yScroll = window.scrollY
		let slot = JSON.parse(localStorage.getItem('items'))

		let slot2 = JSON.parse(localStorage.getItem('items2'))

		if (slot != null) {
			slot.map((slot, index) => {
				let first = document.getElementById(slot.start)
				let last = document.getElementById(slot.end)
				let horiz = first.getBoundingClientRect()
				let vert = last.getBoundingClientRect()
				element2 = document.createElement('div')
				element2.className = 'slot'
				element2.style.backgroundColor = '#ccccff'
				element2.style.width = horiz.right - horiz.left - 5 + 'px'
				element2.style.height = vert.bottom - horiz.top + 'px'
				element2.style.left = horiz.left + 'px'
				element2.style.top = horiz.top + yScroll + 'px'
				document.body.appendChild(element2)
			})
		} else {
			return null
		}
	}

	createValidateDiv = () => {
		let slot = JSON.parse(localStorage.getItem('items'))
		if (slot != null && document.getElementById('calendarBodyId')) {
			if (document.getElementsByClassName('slot')) {
				let old2 = document.getElementsByClassName('slot')
				for (let i = old2.length - 1; i >= 0; --i) {
					if (old2[i]) {
						old2[i].remove()
					}
				}
				this.validateSelect()
				this.getSelect()
			} else {
				this.getSelect()
			}
		} else {
			return null
		}
	}

	/* -------- Define and change Current Week -------- */

	thisWeek = day => {
		return moment(this.state.now)
			.day(day)
			.isoWeek(this.state.weekIndex)
	}

	nextWeek = () => {
		this.setState({
			weekIndex: this.state.weekIndex + 1,
			items: [],
		})
		this.removeRectangle()
	}

	prevWeek = () => {
		this.setState({
			weekIndex: this.state.weekIndex - 1,
			items: [],
		})
		//console.log(this.state.weekIndex)
		this.removeRectangle()
	}

	/* -------- Define and change each hours of the table (15 minutes by cells) -------- */

	createTable = thisHour => {
		hours = []
		for (let minute = 0; minute < 60; minute += 15) {
			let currentTime = `${thisHour}${minute}`
			hours.push(moment(currentTime, 'hm').format('HH:mm'))
		}
	}

	/* -------- Listen window dimensions changes -------- */

	updateDimensions = () => {
		this.setState({
			height: window.innerHeight,
			width: window.innerWidth,
		})
	}

	/* this       */
	updateChildName = () => {
		let myChild = JSON.parse(localStorage.getItem('myChild'));
		
		let notMyChild = JSON.parse(localStorage.getItem('notMyChild'));
		console.log('notmychild dans updateChildName', notMyChild)
		console.log('calendar dans updateChildName', this.state.calendarChild)
		let countMyChild = this.state.countMyChild
		let countNotMyChild = this.state.countNotMyChild
		let firstChild;
		if (this.state.calendarChild == '' ) {
			firstChild = myChild[0]
			this.setState({calendarChild: firstChild})
		} if (this.state.calendarChild == undefined  && countMyChild == myChild.length ) { // && countMyChild - countNotMyChild == countMyChild
			
			firstChild = notMyChild[0]
			this.setState({countMyChild : 100}) //here to prevent the function to replay the function
			this.setState({calendarChild: firstChild})
		} 
	}

	componentDidMount = () => {
		this.removeRectangle()
		this.updateDimensions()
		// this.getSelect()
		window.addEventListener('resize', this.updateDimensions)
		
		
	}

	componentDidUpdate() {
		this.updateChildName()
		
	 }

	/* -------- Sending the data (allChild) to the back -------- */

	sendData = () => {
		let timeSlotObject = JSON.parse(localStorage.getItem('allChildren'));

		axios.post('http://localhost:4000/api/calculRepartition', timeSlotObject) //POST - POST => envoyer infos
			.then((res) => {
				console.log(res.data)
			}).catch((error) => {
				console.log(error)
			})
	};

	render() {
		this.getSelect()
		this.createSelectionDiv()
		this.createValidateDiv()
		
	
		let columns = [
		  {
			key: 'Monday',
			name: `Lun.`,
			day: `${this.thisWeek('Monday').format('DD')}`,
			date: `${this.thisWeek('Monday').format('YYYY-MM-DD ')}`,
		  },
	
		  {
			key: 'Tuesday',
			name: `Mar.`,
			day: `${this.thisWeek('Tuesday').format('DD')}`,
			date: `${this.thisWeek('Tuesday').format('YYYY-MM-DD ')}`,
		  },
	
		  {
			key: 'Wednesday',
			name: `Mer.`,
			day: `${this.thisWeek('Wednesday').format('DD')}`,
			date: `${this.thisWeek('Wednesday').format('YYYY-MM-DD ')}`,
		  },
	
		  {
			key: 'Thursday',
			name: `Jeu.`,
			day: `${this.thisWeek('Thursday').format('DD')}`,
			date: `${this.thisWeek('Thursday').format('YYYY-MM-DD ')}`,
		  },
	
		  {
			key: 'Friday',
			name: `Ven.`,
			day: `${this.thisWeek('Friday').format('DD')}`,
			date: `${this.thisWeek('Friday').format('YYYY-MM-DD ')}`,
		  },
	
		  {
			key: 'Saturday',
			name: `Sam.`,
			day: `${this.thisWeek('Saturday').format('DD')}`,
			date: `${this.thisWeek('Saturday').format('YYYY-MM-DD ')}`,
		  },
	
		  {
			key: 'Sunday',
			name: `Dim.`,
			day: `${this.thisWeek('Sunday').format('DD')}`,
			date: `${this.thisWeek('Sunday').format('YYYY-MM-DD ')}`,
		  },
		]
	
		let rows = [
		  { id: '07', hours: '7h' },
		  { id: '08', hours: '8h' },
		  { id: '09', hours: '9h' },
		  { id: '10', hours: '10h' },
		  { id: '11', hours: '11h' },
		  { id: '12', hours: '12h' },
		  { id: '13', hours: '13h' },
		  { id: '14', hours: '14h' },
		  { id: '15', hours: '15h' },
		  { id: '16', hours: '16h' },
		  { id: '17', hours: '17h' },
		  { id: '18', hours: '18h' },
		  { id: '19', hours: '19h' },
		  { id: '20', hours: '20h' },
		  { id: '21', hours: '21h' },
		  { id: '22', hours: '22h' },
		]
		
	
		return (
		  <>
			<div id="someTableId" className="agendaContainer">
			 
			  <div className="selectWeek">
			  	<h1>{this.state.calendarChild}</h1>
				{/* <p onClick={()=>this.prevWeek()} className='prevWeek'> &#60; </p> */}
				{/* <h1 className="currentMonth">
				  {this.thisWeek('Sunday').format('MMMM YYYY')}
				</h1> */}
				{/* <p onClick={()=>this.nextWeek()} className='nextWeek'> &#62; </p> */}
			  </div>
			  <table
				id="tamèreenstring"
				className="calendarTable"
				cellPadding="0"
				cellSpacing="0"
			  >
				<thead>
				  <tr>
					<th className="calendarCell head first"></th>
					{columns.map(column => {
					  return (
						<th
						  id={this.thisWeek(column.key).format(
							'YYYY-MM-DD ',
						  )}
						  className="calendarCell head"
						>
						  <p className="headColumnName">
							{column.name}{' '}
							<span className="headColumnDay">
							  {column.day}
							</span>
						  </p>
						</th>
					  )
					})}
				  </tr>
				</thead>
				<tbody
				  id="calendarBodyId"
				  className="calendarTableBody"
				  onMouseDown={this.handleAllClickStarts}
				  onMouseUp={this.handleAllClickEnds}
				  onMouseOver={this.handleMouseOver}
				>
				  {rows.map(row => {
					this.createTable(row.id)
					return (
					  <>
						<tr>
						  <th
							className="calendarCell time"
							draggable="false"
							rowSpan="5"
						  >
							{row.hours}
						  </th>
						</tr>
						{hours.map(hour => {
						  return (
							<tr
							  className="agenda__row   hour-start"
							  draggable="false"
							>
							  {columns.map(column => {
								return (
								  <td
									id={column.date + hour}
									className="calendarCell"
								  ></td>
								)
							  })}
							</tr>
						  )
						})}
					  </>
					)
				  })}
				</tbody>
			  </table>
	
			  <div>
				"name Famille A" :
				{this.state.showMyChildName.map(child => (
				  <div>{child}</div>
				))}
			  </div>
			  <div>
				"name Famille B" :{' '}
				{this.state.showOthersChildName.map(child => (
				  <div>{child}</div>
				))}
			  </div>
			  {/* <div>
			  Vous avez sélectionné
			  {this.state.time
				? this.state.time
				: `Vous n'avez pas sélectionné de créneau`}
			</div> */}
			</div>
			<div class="container">
			  <div class="row justify-content-around">
				<button
				  class="btn btn-primary col-6"
				  type="button"
				  value="add child"
				  onClick={() => this.addChild()}
				>
				  Valider le planning de l'enfant
				</button>
				<button
				  class="btn btn-warning btn-sm col-2 "
				  type="button"
				  value="effacer"
				  onClick={() => this.resetCalendarPage()}
				>
				  Effacer ce planning
				</button>
				<button
				  class="btn btn-warning btn-sm col-2 "
				  type="button"
				  value="effacer dernier"
				  onClick={() => this.wipeLastSelect()}
				>
				  Effacer dernière selection
				</button>
				
			  </div>
			  <div className ='row'>
			  <button
				  class="btn btn-warning btn-sm col-2 "
				  type="button"
				  value="envoi data"
				  onClick={() => this.sendData()}
				>
				  Calculer mon taux
				</button>
				  
			  </div>
			  <Link to="/">
				<p
				  class="btn btn-link"
				  onMouseDown={() => this.resetCalendar()}
				>
				  Retour aux simulateurs
				</p>
			  </Link>
			</div>
		  </>
		)
	  }
	}

