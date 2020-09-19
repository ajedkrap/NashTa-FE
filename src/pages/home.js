import React, { useState, useEffect } from 'react';
import {
  Row, Col, Button, Container, Spinner
} from 'reactstrap';

import { useDispatch, useSelector } from "react-redux"
import {
  getEvents
} from "../redux/actions/events"

import qs from "querystring"

import Navbar from "./components/navbar"
import CardEvent from "./components/cards"


const Home = (props) => {
  const dispatch = useDispatch()
  const event = useSelector(state => state.event)
  const { isLoading, eventData, pageInfo } = event
  const { totalPage, prevLink, nextLink } = pageInfo
  const [params] = useState(qs.parse(props.location.search.slice(1)))

  params.page = params.page || 1


  const getAllEvents = (params) => {
    dispatch(getEvents(params))
    if (params) {
      const param = qs.stringify(params)
      props.history.push(`?${param}`)
    }
  }

  useEffect(() => {
    document.title = "Home"

    getAllEvents(params)

  }, [])


  return (
    <Col className="p-0 h-100 no-gutters">
      <Navbar props={props} />
      {isLoading &&
        <Container fluid className="h-100 w-100 d-flex justify-content-center align-items-center">
          <Spinner color="info" style={{ height: "5rem", width: "5rem" }} />
          <Col>Loading</Col>
        </Container>
      }
      {!isLoading && eventData.length > 0 && <>
        <Col className=" d-flex my-5 container ">
          <Row className=" p-0 m-0 ">
            {eventData.map((value, index) => {
              return <CardEvent data={value} key={index} />
            })}
          </Row>
        </Col>
        <div />
        <Col className="col-12 d-flex justify-content-center">
          <Row className='mt-5 mb-5 mx-0'>
            <div className='d-flex flex-row justify-content-around'>
              <div>
                {prevLink !== null ?
                  <Button className="mx-3" onClick={() => getAllEvents({ ...params, page: parseInt(params.page) - 1 })}>Prev</Button> :
                  <Button className="mx-3">...</Button>
                }
              </div>
              <div>
                {[...Array(totalPage)].map((o, i) => {
                  return (
                    <Button onClick={() => getAllEvents({ ...params, page: params.page ? i + 1 : i + 1 })} className='mx-3' key={i.toString()}>{i + 1}</Button>
                  )
                })}
              </div>
              <div>
                {nextLink ?
                  <Button className="mx-3" onClick={() => getAllEvents({ ...params, page: parseInt(params.page) + 1 })}>Next</Button> :
                  <Button className="mx-3">...</Button>
                }
              </div>
            </div>
          </Row>
        </Col>
      </>}
    </Col>
  );

}


export default Home;
