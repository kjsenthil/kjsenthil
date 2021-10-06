import axios from 'axios';
import { expect } from 'chai';
import { assert, object, number, string, boolean, array, nullable } from 'superstruct';
import goalWithLessFieldsPayload from '../payloads/xplan/createGoalWithLessFields';
import goalWithAdditionalFieldsPayload from '../payloads/xplan/createGoalWithAdditionalFields';
import updateGoalPayload from '../payloads/xplan/updateGoal';
import createObjectivePayload from '../payloads/xplan/createObjective';
import updateObjectivePayload from '../payloads/xplan/updateObjective';
import apiEndpoint from '../utils/apiBuilder';
import API_ENDPOINTS from '../utils/apiEndPoints';

describe('Xplan endpoints scenarios', () => {
  let headers;
  let goalIndex;
  let objectiveIndex;
  before(() => {
    headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    };
  });

  it('should create a goal with less fields', async () => {
    // arrange
    const apiUrl = apiEndpoint.getBaseUrl().path(API_ENDPOINTS.CREATE_GOAL_LESS_FIELDS);
    const expectedSchema = object({
      fields: object({
        status: string(),
        category: number(),
        capture_date: object({
          _val: string(),
          _type: string(),
        }),
        advice_type: number(),
        xpt_external_id: nullable(number()),
        owner: string(),
      }),
      allow_associates: boolean(),
      allow_multiple_account_associates: boolean(),
      index: number(),
    });
    // act
    const response = await axios.post(apiUrl, goalWithLessFieldsPayload, {
      headers,
    });
    // assert
    expect(response.status).to.equal(201);
    expect(response.data).to.deep.include(goalWithLessFieldsPayload);
    assert(response.data, expectedSchema);
  });

  it.skip('should create a goal with additional fields', async () => {
    // arrange
    const apiUrl = apiEndpoint.getBaseUrl().path(API_ENDPOINTS.CREATE_GOAL_ADDITIONAL_FIELDS);
    const expectedSchema = object({
      fields: object({
        status: string(),
        category: number(),
        description: string(),
        objective_frequency_end_age: number(),
        capture_date: object({
          _val: string(),
          _type: string(),
        }),
        objective_frequency_start_age: number(),
        drawdown_frequency: number(),
        regular_drawdown: object({
          _val: object({
            code: string(),
            value: object({
              _val: string(),
              _type: string(),
            }),
          }),
          _type: string(),
        }),
        advice_type: number(),
        owner: string(),
      }),
      allow_associates: boolean(),
      allow_multiple_account_associates: boolean(),
      index: number(),
    });
    // act
    const response = await axios.post(apiUrl, goalWithAdditionalFieldsPayload, {
      headers,
    });
    goalIndex = response.data.index;
    // assert
    expect(response.status).to.equal(201);
    expect(response.data).to.deep.include(goalWithAdditionalFieldsPayload);
    assert(response.data, expectedSchema);
  });

  it.skip('should update a goal', async () => {
    const apiUrl = apiEndpoint
      .getBaseUrl()
      .path(API_ENDPOINTS.UPDATE_GOAL.replace('{goal-index}', `${goalIndex}`));
    await axios.patch(apiUrl, updateGoalPayload, {
      headers,
    });
  });

  it('should get all goals', async () => {
    // arrange
    const apiUrl = apiEndpoint.getBaseUrl().path(API_ENDPOINTS.GET_GOALS);
    const params = {
      'fields.0': 'description',
      'fields.1': 'category',
      'fields.2': 'present_value',
      'fields.3': 'target_amount',
    };
    const expectedSchema = array(
      object({
        fields: object({
          category: number(),
          present_value: nullable(string()),
          description: string(),
          target_amount: object({
            _val: object({
              code: string(),
              value: object({
                _val: string(),
                _type: string(),
              }),
            }),
            _type: string(),
          }),
        }),
        allow_associates: boolean(),
        allow_multiple_account_associates: boolean(),
        index: number(),
      })
    );
    // act
    const response = await axios.get(apiUrl, { ...{ params }, ...{ headers } });
    // assert
    expect(response.status).to.equal(200);
    assert(response.data, expectedSchema);
  });

  it('should create an objective', async () => {
    // arrange
    const apiUrl = apiEndpoint.getBaseUrl().path(API_ENDPOINTS.CREATE_OBJECTIVE);
    const expectedSchema = object({
      fields: object({
        owner: string(),
        target_amount: object({
          _val: object({
            code: string(),
            value: object({
              _val: string(),
              _type: string(),
            }),
          }),
          _type: string(),
        }),
        description: string(),
        capture_date: object({
          _val: string(),
          _type: string(),
        }),
      }),
      allow_associates: boolean(),
      allow_multiple_account_associates: boolean(),
      index: number(),
    });
    // act
    const response = await axios.post(apiUrl, createObjectivePayload, {
      headers,
    });
    objectiveIndex = response.data.index;
    // assert
    expect(response.status).to.equal(201);
    expect(response.data).to.deep.include(createObjectivePayload);
    assert(response.data, expectedSchema);
  });

  it('should update an objective', async () => {
    // arrange
    const apiUrl = apiEndpoint
      .getBaseUrl()
      .path(API_ENDPOINTS.UPDATE_OBJECTIVE.replace('{objective-index}', `${objectiveIndex}`));
    const expectedSchema = object({
      fields: object({
        owner: string(),
        target_amount: object({
          _val: object({
            code: string(),
            value: object({
              _val: string(),
              _type: string(),
            }),
          }),
          _type: string(),
        }),
        description: string(),
        capture_date: object({
          _val: string(),
          _type: string(),
        }),
      }),
      allow_associates: boolean(),
      allow_multiple_account_associates: boolean(),
      index: number(),
    });
    // act
    const response = await axios.patch(apiUrl, updateObjectivePayload, {
      headers,
    });
    // assert
    expect(response.status).to.equal(200);
    expect(response.data).to.deep.include(updateObjectivePayload);
    assert(response.data, expectedSchema);
  });

  it('should link a goal with an objective', async () => {
    // arrange
    const apiUrl = apiEndpoint
      .getBaseUrl()
      .path(API_ENDPOINTS.LINK_GOAL_TO_OBJECTIVE.replace('{objective-index}', `${objectiveIndex}`));
    const payload = {
      objective_obj_index: objectiveIndex,
    };
    const params = {
      objective_obj_index: objectiveIndex,
      Target_Amount: 100000,
      Owner: 'client',
    };
    const expectedSchema = object({
      list_obj_name: string(),
      entity_id: number(),
      linked_obj_index: number(),
      linked_obj_name: string(),
      list_obj_index: number(),
    });

    // act
    const response = await axios.post(apiUrl, payload, {
      ...{ params },
      ...{ headers },
    });

    // assert
    expect(response.status).to.equal(201);
    expect(response.data.list_obj_name).to.equal('goals');
    expect(response.data.linked_obj_name).to.equal('objectives');
    assert(response.data, expectedSchema);
  });
});
