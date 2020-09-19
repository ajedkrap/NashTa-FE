import React from 'react';
import {
  Row, Col,
  Card, CardImg, CardBody,
} from "reactstrap"

import styled, { keyframes } from 'styled-components';
import { fadeInUp } from 'react-animations';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

import moment from "moment"

moment.locale("id")

const fadeInAnimation = keyframes`${fadeInUp}`;

const FadeInDiv = styled.div`
  animation: 1s ${fadeInAnimation};
`;

const Cards = (props) => {
  const { title, location, date, participants, note, picture } = props.data
  const { REACT_APP_URL } = process.env
  return (
    <Col className="col-4 center">
      <FadeInDiv>
        <Card>
          <CardImg top src={REACT_APP_URL + picture} alt="Card image cap" />
          <CardBody className="border-bottom p-2 main-card">
            <Row className="m-0 event-location">
              <FontAwesomeIcon className="mr-2" color={"tomato"} icon={faMapMarkerAlt} />
              <div>{location}</div>
            </Row>
            <div className="event-title py-1">{title}</div>
            <div className="h6 event-date">{moment(date, "YYYY-MM-DD").format("DD MMMM YYYY")}</div>
          </CardBody>
          <CardBody className="border-bottom p-2 participants">
            <Row className="m-0" >
              {participants.map((value, index) => {
                while (index < 3) {
                  return <Col col={participants.length * 2} className="p-0" key={index}>
                    <Row className="participant m-0">
                      <img className="participant-img" src={REACT_APP_URL + value.picture} alt="user" />
                      <Col className="p-0 text-center name">{value.name}</Col>
                    </Row>
                  </Col>
                }
              })}
            </Row>
          </CardBody>
          <CardBody className="border-bottom p-2 bg-blue note">
            <Col className="note-text">Note :</Col>
            <Col className="note-detail">{note}</Col>
          </CardBody>
        </Card>
      </FadeInDiv>
    </Col>
  );

}


export default Cards;
