import React, { useState, Component } from 'react'
import { Header } from './TaskCompnents'
import axios from 'axios';
import './main.css'
import { Accordion, Icon } from 'semantic-ui-react'






function TaskCard(props) {

    var [active, setActive] = useState(0)
    const handleClick = (e) => {
        if (active === 1) {
            setActive(0);
        } else if (active === 0) {
            setActive(1);
        }
    }

    return <div className='column card'>
        <h2>Title:{props.title}</h2>
        <h3>Description:{props.description}</h3>
        <p>Expiry Date:{props.expiryDate}</p>
        <Accordion>
            <Accordion.Title
                onClick={handleClick}
            >
                <Icon name='dropdown' />
          Detail
        </Accordion.Title>
            <Accordion.Content active={active}>
                <p>type:{props.type}</p>
                <p>require master?:{props.master}</p>
                <p>reward per response{props.reward}</p>
                <p>number of workers:{props.number}</p>
                <p>setting detail:{props.setting}</p>
            </Accordion.Content>
        </Accordion>
        <a onClick={() => { props.delete(props._id) }}>delete </a>
    </div>

}

function CardList(props) {
    const filteredTask = props.data.filter((task) => {
        return task.title.toLowerCase().includes(props.searchTask.toLowerCase())
    })

    return <div className="row">
        {/* {filteredStaff.map((task) =>
            <TaskCard
                title={task.title}
                name={task.description}
                expiryDate={task.expiryDate}
            />
        )} */}
        {filteredTask.map((task) =>
            <TaskCard
                title={task.title}
                description={task.description}
                type={task.type}
                setting={task.setting}
                master={task.master}
                reward={task.reward}
                number={task.number}
                expiryDate={task.expiryDate}
                _id={task._id}
                delete={props.delete}
                toggle={props.toggle}
            />
        )}
    </div>
}





class Worker extends Component {

    constructor(props) {
        super(props)
        this.deleteTask = this.deleteTask.bind(this)

        this.state = {
            searchTerm: '',
            taskList: [],
        };
    }


    componentDidMount = () => {
        axios.get('http://localhost:5000/workers')
            .then((response) => {
                this.setState({
                    taskList: response.data
                });
                console.log('Data has been received!!');
            })
            .catch(() => {
                alert('Error retrieving data!!!');
            });
    };
    onSearchChange = (e) => {
        this.setState({ searchTerm: e.target.value })
    }
    deleteTask(id) {
        axios.delete('http://localhost:5000/workers/' + id)
            .then(response => { console.log(response.data) });
        this.setState({
            taskList: this.state.taskList.filter(el => el._id !== id)
        })
    }

    // const [searchTerm, setSearchTerm] = useState('')
    // const onSearchChange = (e) => {
    //     setSearchTerm(e.target.value)
    // }


    render() {
        return (<div className='worker_header'>
            <Header text="Tasks List" />
            {/* <div className='header-div'>
            <input type='text' placeholder='search task by title'
                onChange={onSearchChange}
                value={searchTerm} />
        </div>
        <CardList /> */}
            <input type='text' placeholder='search task'
                onChange={this.onSearchChange}
                value={this.state.searchTerm} />
            <CardList data={this.state.taskList}
                searchTask={this.state.searchTerm}
                delete={this.deleteTask}
                toggle={this.toggle} />

        </div>
        )
    }
}

export default Worker