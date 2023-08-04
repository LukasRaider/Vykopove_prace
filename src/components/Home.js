import React, { useRef, useState, useEffect } from "react";
import {
  PageContainer,
  PersonForm,
  PersonLine,
  Button,
  SwitchButtons,
  TabButton,
  Input,
  WorkForm,
  PersonList,
} from "./HomeStyles";
import { people } from "../DataPeople";

const Home = () => {
  const numberOfPeople = useRef(people.length);
  const [activeTab, setActiveTab] = useState("employeeList");
  const [listOfPeople, setListOfPeople] = useState(people);
  let [workButton, setWorkButton] = useState(false);
  let [numberOfFemales, setNumberOfFemales] = useState(1);
  let [numberOfMales, setNumberOfMales] = useState(2);

  let metersInOneHour = numberOfMales + numberOfFemales * 0.5;
  let [metersWanted, setMetersWanted] = useState(0);
  let [hoursWanted, setHoursWanted] = useState(0);

  const [newPerson, setNewPerson] = useState({
    id: numberOfPeople.current + 1,
    firstName: "",
    lastName: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = value.trim();

    const freshPerson = {
      ...newPerson,
      [name]: newValue,
    };
    setNewPerson(freshPerson);
  };

  const handleGenderChange = (e) => {
    setNewPerson((prevPerson) => ({
      ...prevPerson,
      gender: e.target.value,
    }));
  };
  const answerTask = (e) => {
    alert("You have good number of employee.");
  }

  const handleDelete = (idToDelete) => {
    let personToDelete = listOfPeople.filter(
      (person) => person.id === idToDelete
    );
    if (personToDelete[0].gender === "Female") {
      setNumberOfFemales(--numberOfFemales);
    } else {
      setNumberOfMales(--numberOfMales);
    }
    setListOfPeople(listOfPeople.filter((person) => person.id !== idToDelete));
  };

  const handleAdd = () => {
    if (!newPerson.firstName || !newPerson.lastName || !newPerson.gender) {
      alert("Please fill in all the fields before adding.");
      return;
    }

    if (newPerson.gender === "Female") {
      setNumberOfFemales(++numberOfFemales);
    } else {
      setNumberOfMales(++numberOfMales);
    }
    setListOfPeople((prevList) => [...prevList, newPerson]);
    setNewPerson({
      id: numberOfPeople.current + 1,
      firstName: "",
      lastName: "",
      gender: "Male",
    });

    numberOfPeople.current++;
  };

  useEffect(() => {
    if (isNaN(metersWanted) || isNaN(hoursWanted)) {
      setWorkButton(false);
      return;
    }

    let wantedWorkLoad = metersWanted / hoursWanted;

    console.log(
      "za " +
        hoursWanted +
        " hodiny muzou vykopat " +
        metersInOneHour * hoursWanted +
        " metru"
    );
    console.log(
      "za " + hoursWanted + " hodiny CHCOU udelat " + wantedWorkLoad + " metru"
    );

    if (wantedWorkLoad > metersInOneHour) {
      setWorkButton(false);
    } else {
      setWorkButton(true);
    }

    if (hoursWanted === 0 || metersWanted === 0) {
      setWorkButton(false);
    }
  }, [metersWanted, hoursWanted]);

  const handleWork = (e) => {
    if (e.target.name === "meters") {
      setMetersWanted(parseInt(e.target.value));
    }

    if (e.target.name === "hours") {
      setHoursWanted(parseInt(e.target.value));
    }
  };

  return (
    <PageContainer>
      <SwitchButtons>
        <TabButton
          name="employeeList"
          data-active={activeTab}
          onClick={() => {
            setActiveTab("employeeList");
          }}>
          List of Employees
        </TabButton>
        <TabButton
          name="workSelect"
          data-active={activeTab}
          onClick={() => {
            setActiveTab("workSelect");
          }}>
          Task
        </TabButton>
      </SwitchButtons>
      {activeTab === "employeeList" && (
        <>
          <PersonList name="personList">
            {listOfPeople.map((person) => {
              return (
                <PersonLine key={person.id}>
                  {person.firstName} {person.lastName} -{"  "}
                  <strong>{person.gender}</strong>
                  <button
                    style={{
                      marginLeft: 10,
                      color: "red",
                      fontWeight: "bolder",
                      height: 25 + "px",
                      width: 25 + "px",
                    }}
                    onClick={() => {
                      handleDelete(person.id);
                    }}>
                    X
                  </button>
                </PersonLine>
              );
            })}
          </PersonList>
          <PersonForm>
            <Input
              type="text"
              placeholder="Name"
              name="firstName"
              value={newPerson.firstName}
              onChange={handleChange}></Input>
            <Input
              type="text"
              placeholder="Subname"
              name="lastName"
              value={newPerson.lastName}
              onChange={handleChange}></Input>
            <div>
              Male
              <input
                type="radio"
                value="Male"
                name="gender"
                checked={newPerson.gender === "Male"}
                onChange={handleGenderChange}
              />
              Female
              <input
                type="radio"
                value="Female"
                name="gender"
                checked={newPerson.gender === "Female"}
                onChange={handleGenderChange}
              />
            </div>
            <Button onClick={handleAdd}>Add</Button>
          </PersonForm>
        </>
      )}

      {activeTab === "workSelect" && (
        <>
          <h1 style={{ color: "purple" }}>Planning excavations work</h1>
          <p style={{ backgroundColor: "blue", color: "white" }}>Men : {numberOfMales}</p>
          <p style={{ backgroundColor: "red",color: "white" }}>Women : {numberOfFemales}</p>
          <WorkForm>
            <label>Meters works</label><br></br>
            <Input
              type="number"
              min="0"
              placeholder="Enter Meters"
              onChange={handleWork}
              name="meters"></Input>
              <br></br>
            <label>Work hours</label><br></br>
            <Input
              type="number"
              min="0"
              onChange={handleWork}
              placeholder="Enter Hours "
              name="hours"></Input>
              <br></br>
            <Button
              id="workButton"
              disabled={!workButton}
              value="Work Planning"
              style={{ backgroundColor: workButton ? "green" : "red" }}
              onClick={answerTask}>
              Work Planning
            </Button>
          </WorkForm>
        </>
      )}
    </PageContainer>
  );
};

export default Home;