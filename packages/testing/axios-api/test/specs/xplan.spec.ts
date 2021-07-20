import axios from "axios";
import { expect } from "chai";
import {
  assert,
  object,
  number,
  string,
  boolean,
  array,
  nullable,
} from "superstruct";
import goalWithLessFieldsPayload from "../payloads/createGoalWithLessFields";
import goalWithAdditionalFieldsPayload from "../payloads/createGoalWithAdditionalFields";
import updateGoalPayload from "../payloads/updateGoal";
import createObjectivePayload from "../payloads/createObjective";
import updateObjectivePayload from "../payloads/updateObjective";
import { apiEndpoint } from "../utils/apiBuilder";
import { API_ENDPOINTS } from "../utils/apiEndPoints";

describe("test xplan endpoints", () => {
  let headers;
  let goalIndex;
  let objectiveIndex;
  before(() => {
    headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    };
  });

  it("create a goal with less fields", async () => {
    // Arrange
    const apiUrl = apiEndpoint
      .getBaseUrl()
      .path(API_ENDPOINTS.CREATE_GOAL_LESS_FIELDS);
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
    // Act
    const response = await axios.post(apiUrl, goalWithLessFieldsPayload, {
      headers,
    });
    // Assert
    expect(response.status).to.equal(201);
    expect(response.data).to.deep.include(goalWithLessFieldsPayload);
    assert(response.data, expectedSchema);
  });

  it.skip("create a goal with additional fields", async () => {
    // Arrange
    const apiUrl = apiEndpoint
      .getBaseUrl()
      .path(API_ENDPOINTS.CREATE_GOAL_ADDITIONAL_FIELDS);
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
    // Act
    const response = await axios.post(apiUrl, goalWithAdditionalFieldsPayload, {
      headers,
    });
    goalIndex = response.data.index;
    // Assert
    expect(response.status).to.equal(201);
    expect(response.data).to.deep.include(goalWithAdditionalFieldsPayload);
    assert(response.data, expectedSchema);
  });

  it.skip("update a goal", async () => {
    const apiUrl = apiEndpoint
      .getBaseUrl()
      .path(API_ENDPOINTS.UPDATE_GOAL.replace("{goal-index}", `${goalIndex}`));
    await axios.patch(apiUrl, updateGoalPayload, {
      headers,
    });
  });

  it("get all goals", async () => {
    // Arrange
    const apiUrl = apiEndpoint.getBaseUrl().path(API_ENDPOINTS.GET_GOALS);
    const params = {
      "fields.0": "description",
      "fields.1": "category",
      "fields.2": "present_value",
      "fields.3": "target_amount",
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
    // Act
    const response = await axios.get(apiUrl, { ...{ params }, ...{ headers } });
    // Assert
    expect(response.status).to.equal(200);
    assert(response.data, expectedSchema);
  });

  it("create an objective", async () => {
    // Arrange
    const apiUrl = apiEndpoint
      .getBaseUrl()
      .path(API_ENDPOINTS.CREATE_OBJECTIVE);
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
    // Act
    const response = await axios.post(apiUrl, createObjectivePayload, {
      headers,
    });
    objectiveIndex = response.data.index;
    // Assert
    expect(response.status).to.equal(201);
    expect(response.data).to.deep.include(createObjectivePayload);
    assert(response.data, expectedSchema);
  });

  it("update an objective", async () => {
    // Arrange
    const apiUrl = apiEndpoint
      .getBaseUrl()
      .path(
        API_ENDPOINTS.UPDATE_OBJECTIVE.replace(
          "{objective-index}",
          `${objectiveIndex}`
        )
      );
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
    // Act
    const response = await axios.patch(apiUrl, updateObjectivePayload, {
      headers,
    });
    // Assert
    expect(response.status).to.equal(200);
    expect(response.data).to.deep.include(updateObjectivePayload);
    assert(response.data, expectedSchema);
  });

  it("link a goal with an objective", async () => {
    // Arrange
    const apiUrl = apiEndpoint
      .getBaseUrl()
      .path(
        API_ENDPOINTS.LINK_GOAL_TO_OBJECTIVE.replace(
          "{objective-index}",
          `${objectiveIndex}`
        )
      );
    const payload = {
      objective_obj_index: objectiveIndex,
    };
    const params = {
      objective_obj_index: objectiveIndex,
      Target_Amount: 100000,
      Owner: "client",
    };
    const expectedSchema = object({
      list_obj_name: string(),
      entity_id: number(),
      linked_obj_index: number(),
      linked_obj_name: string(),
      list_obj_index: number(),
    });

    // Act
    const response = await axios.post(apiUrl, payload, {
      ...{ params },
      ...{ headers },
    });

    // Assert
    expect(response.status).to.equal(201);
    expect(response.data.list_obj_name).to.equal("goals");
    expect(response.data.linked_obj_name).to.equal("objectives");
    assert(response.data, expectedSchema);
  });
});
