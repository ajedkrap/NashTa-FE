import React, { useState, useEffect } from 'react';

import Navbar from "./components/navbar"
import {
  Container, Col, Row, Table, Spinner, Input, Button
} from "reactstrap"

import { useDispatch, useSelector } from "react-redux"
import {
  getEvents
} from "../redux/actions/events"

import qs from "querystring"


const Dashboard = (props) => {
  const dispatch = useDispatch()
  const event = useSelector(state => state.event)
  const { isLoading, eventData, pageInfo } = event
  const { totalPage, prevLink, nextLink } = pageInfo
  const [params] = useState(qs.parse(props.location.search.slice(1)))
  const [search, setSearch] = useState("")

  params.page = params.page || 1
  params.limit = params.limit || 5
  params.search = params.search || ""
  params.sort = params.sort || 1
  params.sortBy = params.sortBy || "title"

  const getAllEvents = (params) => {
    dispatch(getEvents(params))
    if (params) {
      const param = qs.stringify(params)
      props.history.push(`?${param}`)
    }
  }

  const handleSearch = (e, params) => {
    if (e.keyCode === 13) {
      getAllEvents({ ...params, search })
    }
  }

  useEffect(() => {
    document.title = "Dashboard"
    getAllEvents(params)
  }, [])

  return (
    <>
      <Navbar props={props} />
      <Container fluid={true}>
        {isLoading && (
          <div className='d-flex justify-content-center align-items-center'>
            <Spinner style={{ width: '3rem', height: '3rem' }} />
          </div>
        )}
        {!isLoading && eventData.length > 0 &&
          < Row className='d-flex w-100 my-2 mx-0 align-items-center h-100'>
            <Input className="col-6 m-4 justify-content-start" type="text" placeholder="search"
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => handleSearch(e, params)}
            />
            <div className='w-100' />
            <Col className='w-100'>
              <Table className="px-3" striped hover>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Title</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Participants</th>
                    <th className="note-table">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {eventData.map((value, index) => (
                    <tr key={index}>
                      <th scope="row">{value.id}</th>
                      <td >{value.title}</td>
                      <td >{value.location}</td>
                      <td >{value.date}</td>
                      <td >{value.participants.map(value => value.name).join(" ,")}</td>
                      <td  >{value.note}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
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
          </Row>
        }
      </Container>
    </>
  );

}


export default Dashboard;
