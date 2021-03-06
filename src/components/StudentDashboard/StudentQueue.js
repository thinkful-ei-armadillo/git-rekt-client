import React, { Component } from "react";
import QueueContext from "../../context/QueueContext";
import HelpForm from "../../components/HelpForm/HelpForm";
import "./StudentQueue.css";
import StudentWaitingNameList from "./studentWaitingNameList/studentWaitingNameList";
import { Link } from "react-router-dom";

export default class StudentQueue extends Component {
  static contextType = QueueContext;
  constructor(props) {
    super(props);

    this.state = {
      note: ""
    };
  }

  componentDidMount() {
    this.context.webSocket();
    this.context.dequeueWait();
  }

  renderPlaceInLine(indexInLine) {
    return (
      <div className="position-in-line">
        You are currently #{indexInLine + 1} in line
      </div>
    );
  }

  renderOpenTickets(numOfTickets) {
    return <div>You have {numOfTickets} open ticket(s)</div>;
  }

  renderChatRoom(room) {
    return (
      <p>
        Your mentor {room.mentorName} is waiting in this{" "}
        <span>
          <Link to={room.url}>Room</Link>
        </span>
      </p>
    );
  }

  render() {
    const { showNote, queueList } = this.context;
    const { user_name, full_name } = this.props.user;
    const userTickets = queueList.filter(el => el.studentName === full_name);
    const numberInLine = queueList.indexOf(userTickets[0]);
    const isSomeoneInLine = !queueList.length;
    return (
      <section className="student-dashboard-container row">
        <div className="studentsMainPage col-12">
          <h2 className="studentListTitle">Waiting List</h2>
          {showNote.user_name === user_name && this.renderChatRoom(showNote)}
          {numberInLine > 0 && this.renderPlaceInLine(numberInLine)}
          {userTickets ? (
            this.renderOpenTickets(userTickets.length)
          ) : (
            <div>You don't have any tickets open.</div>
          )}
          {isSomeoneInLine && (
            <p className="noOneInQueue">No one is in line for help</p>
          )}
          {!userTickets.length && <HelpForm className="getHelpButton" />}
          <ul className={!isSomeoneInLine ? "studentWaitingQueue" : ""}>
            {queueList.map((listItem, index) => (
              <StudentWaitingNameList
                key={index}
                personInLine={listItem}
                currentUser={user_name}
              />
            ))}
          </ul>
        </div>
      </section>
    );
  }
}
