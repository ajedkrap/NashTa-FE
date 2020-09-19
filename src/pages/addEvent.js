import React, { useState, useEffect } from 'react';

import {
  Row, Col, Form, FormGroup, Label, Input,
  Button, Spinner
} from "reactstrap"

import { useSelector, useDispatch } from "react-redux"
import { getParticipants } from "../redux/actions/participants"
import { createEvent, clearMessage } from "../redux/actions/events"

import swal from 'sweetalert';
import moment from 'moment'

import Select from "react-select"
import makeAnimated from 'react-select/animated';

import Navbar from "./components/navbar"
import CardPreview from "./components/cardPreview"


const AddEvent = (props) => {
  const dispatch = useDispatch()
  const participant = useSelector(state => state.participant)
  const event = useSelector(state => state.event)

  const [participants, setParticipants] = useState([])
  const [date, setDate] = useState("")
  const [title, setTitle] = useState("")
  const [location, setLocation] = useState("")
  const [note, setNote] = useState("")
  const [picture, setPicture] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [ability, setAbility] = useState(false)


  const { participantsSelect, participantsData } = participant
  const { isLoading, isError, createEventMessage } = event

  const imageChange = (file) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      setPicture(file)
      setImageUrl(reader.result)
    }

    reader.readAsDataURL(file)
  }

  const setParty = (e) => {
    if (e === null) {
      return setParticipants([])
    }
    return setParticipants(e)
  }

  const createAnEvent = (e) => {
    e.preventDefault()

    const presentDay = moment().format("YYYY-MM-DD")
    const isBefore = moment(date).isBefore(presentDay)
    setAbility(true)
    if (
      date === "" ||
      title === "" ||
      location === "" ||
      note === "") {
      setAbility(false)
      alert("form need to be filled")
    }
    else if (isBefore) {
      setAbility(false)
      alert("date invalid")
    }
    else if (picture === null) {
      setAbility(false)
      alert("image is empty")
    }
    else if (participants.length < 1) {
      setAbility(false)
      alert("someone need to participate")
    }
    else {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('location', location)
      formData.append('picture', picture)
      formData.append('participant_id', participants.map(value => value.value).join(","))
      formData.append('date', date)
      formData.append('note', note)
      dispatch(createEvent(formData))
    }
  }

  useEffect(() => {
    document.title = "Add Event"
    if (participantsData.length < 1) {
      dispatch(getParticipants())
    }

    if (createEventMessage !== null) {
      if (isError) {
        swal({
          title: "Something is Wrong!",
          text: createEventMessage,
          icon: "error",
        });
      }
      else {
        swal({
          title: title + " is successfully recorded",
          text: createEventMessage,
          icon: "success"
        })
        props.history.push("/")
      }
      setAbility(false)
      dispatch(clearMessage())
    }
  }, [participantsData, title, isError, dispatch, createEventMessage])

  return (
    <div>
      <Navbar props={props} />
      <Row className="content-container m-0">
        <Col className=" col-8 content border side " >
          <Form >
            <Row className="m-0">
              <Col>
                <FormGroup className="mx-2">
                  <Label for="title">Title</Label>
                  <Input type="text" name="email" id="title" placeholder="event title.."
                    disabled={ability}
                    onChange={event => setTitle(event.target.value)}
                  />
                </FormGroup>
                <FormGroup className="mx-2">
                  <Label for="location">Location</Label>
                  <Input type="text" name="location" id="location" placeholder="location..."
                    disabled={ability}
                    onChange={event => setLocation(event.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className="mx-2">
                  <Label for="participants">Participants</Label>
                  <Select
                    isDisabled={ability}
                    closeMenuOnSelect={false}
                    components={makeAnimated()}
                    isMulti
                    options={participantsSelect}
                    onChange={event => setParty(event)}
                  />
                </FormGroup>
                <FormGroup className="mx-2">
                  <Label for="date">Date</Label>
                  <Input type="date" name="date" id="date" placeholder="date"
                    disabled={ability}
                    onChange={e => setDate(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Col>
              <FormGroup className="mx-1">
                <Label for="exampleText">Note</Label>
                <Input type="textarea" height={"20%"} name="text" id="exampleText"
                  disabled={ability}
                  onChange={e => setNote(e.target.value)}
                />
              </FormGroup>
              <Row className="m-0 d-flex justify-between">
                <FormGroup className="mx-1">
                  <Label for="exampleFile">File</Label>
                  <Input type="file" name="file" id="exampleFile"
                    onChange={e => imageChange(e.target.files[0])}
                    disabled={ability}
                  />
                </FormGroup>
                <Button className="my-4"
                  onClick={(e) => createAnEvent(e)}
                >{isLoading ? <Spinner color="info" /> : "Submit"}</Button>
              </Row>
            </Col>
          </Form>
        </Col>
        <Col className=" col-4 content border preview  " >
          <CardPreview
            participants={participants}
            date={date}
            title={title}
            location={location}
            note={note}
            picture={imageUrl}
          />
        </Col>
      </Row>
    </div>
  );

}


export default AddEvent;
