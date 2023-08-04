import { people } from '../DataPeople';
import { PageContainer, ListOfPeople, Work, PeopleForm, Input, Button, Buttons, TabButton, CompanyForm } from './HomeStyles';
import React, { useState, useEffect, useRef } from 'react';

export default function Home() {
    const [listOfDogs, setListOfDogs] = useState(dogs);
    const [newDog, setNewDog] = useState({
        id: (listOfDogs.length > 0 ? Math.max(...listOfDogs.map(dog => dog.id)) + 1 : 1),
        firstname: "",
        lastname: "",
        gender: ""
    });
    const dogsCount = useRef(dogs.length);
    const [valid, setValid] = useState(false);
    const [activeTab, setActiveTab] = useState('list-of-dogs');
    const [shelterStorage, setShelterStorage] = useState({
        food: 35,
        vaccine: 15,
        pills: 20
    });
    const [tempStorage, setTempStorage] = useState({
        food: "",
        vaccine: "",
        pills: ""
    });
    const dogsRequirements = {
        food: 5,
        vaccine: 1,
        pills: 2
    };



    const handleChange = (e) => {
        const updatedDog = { ...newDog, [e.target.name]: e.target.value };
        setNewDog(updatedDog);
        validateData(updatedDog);
    };

    const validateData = (dog) => {
        if (dog.age === '' || parseInt(dog.age) < 0 || parseInt(dog.age) > 24) {
            return setValid(false);
        } else if (dog.name.trim().length === 0) {
            return setValid(false);
        } else if (dog.race.trim().length === 0) {
            return setValid(false);
        }
        setValid(true);
    };

    const handleAdd = () => {
        let pushDog = false;
        let totalRequirements = {
            food: (dogsRequirements.food * (listOfDogs.length + 1)),
            vaccine: (dogsRequirements.vaccine * (listOfDogs.length + 1)),
            pills: (dogsRequirements.pills * (listOfDogs.length + 1))
        }

        if (
            totalRequirements.food <= shelterStorage.food &&
            totalRequirements.vaccine <= shelterStorage.vaccine &&
            totalRequirements.pills <= shelterStorage.pills
        ) {
            pushDog = true;
        }
        if (pushDog) {
            setListOfDogs((listOfDogs) => {
                return [...listOfDogs, newDog];
            });
            //const newDogId = newDog.id + 1;
            dogsCount.current++;
            const updatedDog = {
                //id: newDogId,
                id: dogsCount.current + 1,
                name: "",
                race: "",
                age: ""
            }
            setNewDog(updatedDog);
            validateData(updatedDog);
        } else {
            alert("nedostatek zásob pro přidání psa");
        }
    };

    const handleDelete = (idToDel) => {
        setListOfDogs(listOfDogs.filter(dog => dog.id !== idToDel));
    }

    const handleStorage = (e) => {
        setTempStorage({ ...tempStorage, [e.target.name]: e.target.value })
    }

    const updateStorage = () => {
        const storageValue = tempStorage;
        let newStorageValue = {};
        const keys = Object.keys(storageValue);
        keys.map((key) => {
            if (parseInt(storageValue[key])) {
               return newStorageValue[key] = parseInt(shelterStorage[key]) + parseInt(storageValue[key]);
            } else {
               return newStorageValue[key] = parseInt(shelterStorage[key]);
            }
        })
        setShelterStorage(newStorageValue);
        setTempStorage({ food: "", vaccine: "", pills: "" });
    }
    useEffect(() => { console.log(newDog) }, [newDog]);
    useEffect(() => { console.log(listOfDogs) }, [listOfDogs]);

    return (
        <PageContainer>
            <Buttons>
                <TabButton name='list-of-dogs' data-active={activeTab} onClick={() => { setActiveTab('list-of-dogs') }}>
                    Seznam Psů
                </TabButton>
                <TabButton name='shelter-storage' data-active={activeTab} onClick={() => { setActiveTab('shelter-storage') }}>
                    Sklad útulku
                </TabButton>
            </Buttons>
            {(activeTab === 'list-of-dogs') &&
                <>
                    <DogList name='dogList'>
                        {listOfDogs.map((dog) => {
                            return (
                                <DogItem key={dog.id}>
                                    <span>
                                        {dog.name} / {dog.race} / {dog.age}
                                    </span>
                                    <button
                                        style={{
                                            color: '#64766a',
                                            fontWeight: 'bolder',
                                            border: 2 + 'px solid #64766a',
                                            borderRadius: 50 + '%',
                                            height: 25 + 'px',
                                            width: 25 + 'px'
                                        }}
                                        onClick={() => { handleDelete(dog.id) }}
                                    >
                                        X
                                    </button>
                                </DogItem>
                            )
                        })}
                    </DogList>
                    <DogForm>
                        <Input
                            type="text"
                            placeholder="jméno psa"
                            name="name"
                            onChange={handleChange}
                            value={newDog.name}
                        />
                        <Input
                            type="text"
                            placeholder="rasa psa"
                            name="race"
                            onChange={handleChange}
                            value={newDog.race}
                        />
                        <Input
                            type="number"
                            placeholder="věk psa"
                            name="age"
                            min="0"
                            max="24"
                            onChange={handleChange}
                            value={newDog.age}
                        />
                        <Button
                            disabled={!valid}
                            onClick={handleAdd}
                        >
                            Přidat
                        </Button>
                    </DogForm>
                </>
            }
            {(activeTab === 'shelter-storage') &&
                <>
                    <h3>Aktuální zásoby</h3>
                    <p>granule: {shelterStorage.food} kg</p>
                    <p>vakcíny: {shelterStorage.vaccine} ks</p>
                    <p>medikamenty: {shelterStorage.pills} ks</p>
                    <ShelterForm>
                        <Input
                            type='number'
                            min="0"
                            placeholder='granule (kg)'
                            name='food'
                            value={tempStorage.food}
                            onChange={handleStorage}
                        />
                        <Input
                            type='number'
                            min="0"
                            placeholder='vakcíny (ks)'
                            name='vaccine'
                            value={tempStorage.vaccine}
                            onChange={handleStorage}
                        />
                        <Input
                            type='number'
                            min="0"
                            placeholder='léky (ks)'
                            name='pills'
                            value={tempStorage.pills}
                            onChange={handleStorage}
                        />
                        <Button
                            onClick={updateStorage}
                        >
                            Doplnit zásoby
                        </Button>
                    </ShelterForm>
                </>
            }
        </PageContainer >
    )
}