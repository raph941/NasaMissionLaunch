const request = require('supertest')
const app = require('../../app')

describe('Test GET /launches', () => {
    test('It should respond with 200 success', async () => {
        const response  = await request(app)
            .get('/launches')
            // Checks if the content type contains the keyword json
            .expect('Content-Type', /json/)
            .expect(200);
    })
})

describe('Test POST /launch', () => {
    const launchData = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186 f',
        launchDate: 'January 4, 2028',
        destination: 'Moon'
    }

    const launchDataWithoutDate = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186 f',
        destination: 'Moon'
    }

    const launchDataWithInvalidDate = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186 f',
        destination: 'Moon',
        launchDate: 'hello'
    }
    
    test('It should respond with 201 success', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchData)
            .expect('Content-Type', /json/)
            .expect(201)

        const requestDate = new Date(launchData.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf();

        expect(responseDate).toBe(requestDate)
        
        // When checking the response body it's better to use the jest assertions
        // This assertion matches two objects partially
        expect(response.body).toMatchObject(launchDataWithoutDate)


    });

    test('It should catch missing required properties', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400)
        
        expect(response.body).toStrictEqual({
            'error': 'Missing required launch property'
        })
    });

    test('It should catch invalid dates', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithInvalidDate)
            .expect('Content-Type', /json/)
            .expect(400)
        
        expect(response.body).toStrictEqual({
            'error': 'Invalid launch Date'
        })
    });
})