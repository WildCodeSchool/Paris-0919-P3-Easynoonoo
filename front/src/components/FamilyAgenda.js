import React from 'react'

import moment from 'moment'

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
    arrayChildren: [],
    showMyChildName: [],
    showOthersChildName: [],
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

  validateSelect = () => {
    if (this.state.items.length > 0) {
      let items = JSON.parse(localStorage.getItem('items'))
      if (items === null) {
        items = [
          { start: this.state.items[0], end: this.state.items[1] },
        ]
      } else {
        items.push({
          start: this.state.items[0],
          end: this.state.items[1],
        })
      }
      localStorage.setItem('items', JSON.stringify(items))
/* 
      // alert(`Création d'une plage horaire de ${this.state.items[0]} à ${this.state.items[1]}`)
      localStorage.setItem('items', JSON.stringify(items))
      // this.setState({ items: [] })

      // __________________ CALCULS DES DATES ________________

      let date1 = moment(this.state.items[0])

      let minutes = this.state.minutes
      let date2 = moment(this.state.items[1])
      let difference = date2.diff(date1, 'minutes')
      minutes.push(difference)

      this.setState({ minutes: difference })
      this.setState({ minutes: minutes })

      let total = minutes.reduce((a, b) => a + b, 0)

      // _____ CALCULS MINUTES EN HEURES

      let time = total / 60
      let min = (time % 1) * 60
      let hours = Math.trunc(total / 60)

      let realTime = hours + ' heures et ' + min + ' min'
      this.setState({ time: realTime, setTime: true })
      console.log('TIME', realTime) */
    } else {
      return null
    }
  }

  displayChild = () => {
    let myChild = JSON.parse(localStorage.getItem('myChild'))
    // let notMyChild = JSON.parse(localStorage.getItem('notMyChild'));
    let nameChild = this.state.nameChild
    // let nameChildOthers = this.state.nameChildOthers;

    nameChild = [...myChild]
    this.setState({ showMyChildName: nameChild })
    // this.setState({ nameChild: nameChild })
    console.log('nameChild', nameChild)
  }

  addChild = () => {
    let items = JSON.parse(localStorage.getItem('items'))
    let items2 = JSON.parse(localStorage.getItem('items2'))
    let myChild = JSON.parse(localStorage.getItem('myChild'))
    let notMyChild = JSON.parse(localStorage.getItem('notMyChild'))
    let i = this.state.countMyChild
    let j = this.state.countNotMyChild
    let nameChild = this.state.nameChild
    let nameChildOthers = this.state.nameChildOthers
    let childColor = Math.floor(Math.random() * 16777215).toString(16)

    let arrayChildren = this.state.arrayChildren
    let colorState = this.state.colorState

    if (i < myChild.length) {
      if (items.length > 0) {
        nameChild = [...nameChild, myChild[i]]
        for (let k = 0; k < items.length; k++) {
          arrayChildren.push(items[k])
          items2.push(items[k])
          arrayChildren.push({ color: '#' + childColor })
          colorState.push(childColor)
          arrayChildren.push({ name: nameChild })
          this.setState({ color: childColor })
        }

        arrayChildren.push({ ownChild: true, id: i + 1 })
        localStorage.setItem(
          'allChildren',
          JSON.stringify(arrayChildren),
        )
        localStorage.setItem('items2', JSON.stringify(items2))
        // localStorage.setItem('items', JSON.stringify([]));
        i++
        this.setState({ countMyChild: i })
        this.setState({ showMyChildName: nameChild })
        console.log(this.state.showMyChildName)
        this.setState({ nameChild: nameChild })
        this.setState({ colorState: colorState })
        console.log('color1', colorState[colorState.length - 1])
      } else {
        alert('Pas de plages horaires sélectionnées pour cet enfant')
      }
    } else {
      if (j < notMyChild.length) {
        if (items.length > 0) {
          nameChildOthers = [...nameChildOthers, notMyChild[j]]
          for (let k = 0; k < items.length; k++) {
            arrayChildren.push(items[k])
            arrayChildren.push({ color: childColor })
          }
          for (let k = 0; k < items.length; k++) {
            items2.push(items[k])
          }

          arrayChildren.push({ name: nameChildOthers })

          arrayChildren.push({ ownChild: false, id: i + 1 })
          localStorage.setItem(
            'allChildren',
            JSON.stringify(arrayChildren),
          )
          localStorage.setItem('items2', JSON.stringify(items2))
          localStorage.setItem('items', JSON.stringify([]))
          this.setState({ showOthersChildName: nameChildOthers })
          this.setState({ nameChildOthers: nameChildOthers })
          i++
          j++
        } else {
          alert(
            'Pas de plages horaires sélectionnées pour cet enfant',
          )
        }
      } else {
        alert("Il n'y a plus d'enfant à rajouter")
      }
    }
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
      this.handleMouseClick(e.target.id)
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
    element.style.width = horiz.right - horiz.left - 3 + 'px'
    element.style.height = vert.bottom - horiz.top + 'px'
    element.style.left = horiz.left + 'px'
    element.style.top = horiz.top + yScroll + 'px'
    document.body.appendChild(element)
  }

  createSelectionDiv = () => {
    if (this.state.items.length > 0) {
      if (document.getElementsByClassName('slot')) {
        let old = document.getElementsByClassName('slot')
        for (let i = old.length - 1; i >= 0; --i) {
          if (old[i]) {
            old[i].remove()
          }
        }
        this.validateSelect()
        this.createValidateDiv()
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
    //CHAMP DE BATAILLE
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
        element2.style.width =
          /* (horiz.right - horiz.left)/2 -  */ 12 + 'px'
        element2.style.height = vert.bottom - horiz.top + 'px'
        element2.style.left = horiz.left + 12 + 'px'
        element2.style.top = horiz.top + yScroll + 'px'
        document.body.appendChild(element2)
      })
    }
    if (slot2 != null) {
      slot2.map((slot, index) => {
        let first = document.getElementById(slot.start)
        let last = document.getElementById(slot.end)
        let horiz = first.getBoundingClientRect()
        let vert = last.getBoundingClientRect()
        element2 = document.createElement('div')
        element2.className = 'slot'
        element2.style.backgroundColor =
          '#' +
          this.state.colorState[this.state.colorState.length - 1]

        // element2.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        element2.style.width =
          /* (horiz.right - horiz.left)/2 -  */ 12 + 'px'
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

  componentDidMount = () => {
    this.removeRectangle()
    this.updateDimensions()
    this.getSelect()
    window.addEventListener('resize', this.updateDimensions)
  }

  componentDidUpdate() {}

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
      <div id="someTableId" className="agendaContainer">
        <div className="selectWeek">
          {/* <p onClick={()=>this.prevWeek()} className='prevWeek'> &#60; </p> */}
          <h1 className="currentMonth">
            {this.thisWeek('Sunday').format('MMMM YYYY')}
          </h1>
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

        <input
          type="button"
          value="add child"
          onClick={() => this.addChild()}
          className="validateSelectionAgenda"
        ></input>

        <div>
          "name Famille A" : {this.state.showMyChildName} color : #
          {this.state.colorState[this.state.colorState.length - 1]}{' '}
        </div>
        <div>
          "name Famille B" : {this.state.showOthersChildName}{' '}
        </div>
        <div>
          Vous avez sélectionné{' '}
          {this.state.time
            ? this.state.time
            : `Vous n'avez pas sélectionné de créneau`}
        </div>
      </div>
    )
  }
}
