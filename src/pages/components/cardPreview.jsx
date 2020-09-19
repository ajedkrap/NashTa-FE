import React from 'react';
import {
  Row, Col,
  Card, CardImg, CardBody,
} from "reactstrap"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

import moment from "moment"
moment.locale("id")


const CardPreview = (props) => {
  const { title, location, date, participants, note, picture } = props
  const { REACT_APP_URL } = process.env
  return (
    <Col className="center">
      <Card className="card-preview">
        {picture !== null ?
          <CardImg top width="100%" src={picture} alt="Card image cap" /> :
          <CardBody className="image-placeholder" />
        }
        <CardBody className="border-bottom p-2 main-card">
          <Row className="m-0 event-location">
            <FontAwesomeIcon className="mr-2" color={"tomato"} icon={faMapMarkerAlt} />
            <div>{location !== "" ? location : "No location"}</div>
          </Row>
          <div className="h3 event-title py-1">{title !== "" ? title : "insert your title here"}</div>
          <div className="h6 event-date">{date !== "" ? moment(date, "YYYY-MM-DD").format("DD MMMM YYYY") : "insert your date here"}</div>
        </CardBody>
        <CardBody className="border-bottom p-2 participants">
          <Row className="m-0" >
            {participants.length === 0 &&
              <Col>No Participants</Col>
            }
            {participants.length > 0 &&
              participants.map((value, index) => {
                while (index < 3) {
                  return <Col col={4} className="p-0" key={index}>
                    <Row className="participant m-0">
                      <img className="participant-img" src={REACT_APP_URL + value.detail['picture']} alt="user" />
                      <Col className="p-0 text-center name">{value.label}</Col>
                    </Row>
                  </Col>
                }
              })
            }
          </Row>
        </CardBody>
        <CardBody className="border-bottom p-2 bg-blue note">
          <Col className="note-text">Note :</Col>
          <Col className="note-detail">{note}</Col>
        </CardBody>
      </Card>
    </Col>
  );

}


export default CardPreview;
