import React, { useState, useEffect } from 'react'
import { useStyles } from '../../../Utils/globalStyles'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import CsvDownload from 'react-json-to-csv'
import Plot from 'react-plotly.js';
import { APIBaseURL } from '../../../constants';




const MeetHistory = (props) => {

  const { auth } = props
  //get query parameter
  const search = useLocation().search;
  const params = new URLSearchParams(search);
  const teamid = params.get('teamid')
  //Debugging purpose
  console.log(teamid)
  const [meetings, setMeetings] = useState([])
  const [meetnames, setMeetName] = useState([])
  const [membercount, setMembercount] = useState([])

  //fetching meeting details of specific team
  useEffect(() => {
    const fetchMeet = async () => {

      const response = await axios.get(`${APIBaseURL}/team/meetings`, {
        headers: { 'team_id': teamid }
      })
      const meets = response.data.meets;
      setMeetings(meets)

      var name = []
      var memberlength = []
      meets.map(item => {
        name.push(item.name)
        memberlength.push(item.members.length)

      })
      setMeetName(name)
      setMembercount(memberlength)
    };

    fetchMeet().catch((error) => {
      console.log(error.message)

    });

  }, []);

  //debugging purpose
  console.log(meetings)

  //proctected routing
  if (!auth.uid && auth.isLoaded) {
    return <Redirect to="/login" />
  }
  return (

    <>

      <div className="d-flex justify-content-center">
        <h4>Meeting History</h4>
      </div>
      <hr color="#333333"></hr>

      <div className="row d-flex justify-content-center ml-4 ">
        {meetnames.length === 0 && <p>No meetings found</p>}
        {meetnames.length > 0 &&
          <>
            <table class="table">
              <thead class="thead-dark">
                <tr>

                  <th scope="col">Meet Name</th>
                  <th scope="col">Date</th>
                  <th scope="col">Host</th>
                  <th scope="col">Attendance</th>
                </tr>
              </thead>
              <tbody>
                {meetings && meetings.map((item) => {

                  return (


                    <tr>

                      <td>{item.name}</td>
                      <td>{item.createdAt.slice(0, 10)}</td>
                      <td>{item.host[0].name}</td>
                      <td><CsvDownload data={item.members} filename="attendance.csv" style={{ //pass other props, like styles
                        boxShadow: "inset 0px 1px 0px 0px #14a2b8",
                        background: "linear-gradient(to bottom, #14a2b8 5%, #14a2b8 100%)",
                        backgroundColor: "#14a2b8",
                        borderRadius: "6px",
                        border: "1px solid #14a2b8",
                        display: "inline-block",
                        cursor: "pointer", "color": "#ffffff",
                        fontSize: "15px",
                        fontWeight: "bold",
                        padding: "6px 10px",
                        textDecoration: "none",
                        textShadow: "0px 1px 0px #14a2b8"
                      }}> Download</CsvDownload></td>
                    </tr>

                  )
                })}

              </tbody>
            </table>
          </>
        }
        {meetnames.length > 0 &&
          <Plot
            data={[{
              type: 'bar', x: meetnames, y: membercount, marker: {
                color: '#14a2b8'
              }
            }]}
            layout={{
              width: 620,
              height: 240,
              color: "#14a2b8",
              title: 'Meeting Analysis',
              yaxis: {
                title: 'No. of attendees',
                titlefont: {
                  size: 10,
                  color: 'rgb(107, 107, 107)'
                },
                tickfont: {
                  size: 14,
                  color: 'rgb(107, 107, 107)'
                },
                tick0: 0,
                dtick: 1,
              },
              xaxis: {
                title: 'Meetings',
                titlefont: {
                  size: 10,
                  color: 'rgb(107, 107, 107)'
                },

                tickfont: {
                  size: 14,
                  color: 'rgb(107, 107, 107)'
                }
              },
              legend: {
                x: 0,
                y: 1.0,
                bgcolor: 'rgba(255, 255, 255, 0)',
                bordercolor: 'rgba(255, 255, 255, 0)'
              },
              bargap: 0.15,
            }}
          />
        }
      </div>
    </>

  )
}

const mapStateToProps = ({ auth, firebase }) => {
  return {
    auth: firebase.auth,
    authError: auth.authError
  }
}
export default connect(mapStateToProps)(MeetHistory)