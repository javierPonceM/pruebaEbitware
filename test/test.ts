import { expect } from "chai";
import { get } from "config";
import { RedisClients } from "db/RedisClient";
import * as _ from "lodash";
import logger from "logger";
import * as nock from "nock";
import {OrchestratorService} from "service/orchestrator/impl/OrchestratorServiceImpl";

let conversation: OrchestratorService;
let response: any;
let corsRes: any;
let feedback: any;
let contextMessage: any;
let feedbackConversation: any;
before((done) => {

    contextMessage = {
      context: {
        sender_psid: "123",
      },
        input: {
          text: "Hola",
        },
      };

    response = {
      context: {
        conversation_id: "bf11ded6-76d4-41ae-a672-8290ed7380bd",
        sender_psid: "123",
        system: {},
      }, entities: [],
      input: {
        text: "",
      }, intents: [],
      output: {
        log_messages: [],
        nodes_visited: ["Bienvenido"],
        text: ["¡Bienvenido!"],
      },
    };
    corsRes = `<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta
    charset=\"utf-8\">\n<title>Error</title>\n</head>\n<body>\n<pre>The CORS
    policy for this site does not allow access from the specified Origin.
    The origin is: undefined</pre>\n</body>\n</html>\n`;
    feedback = {
        comment: "the chat bot gave me a solution",
        conversationId: "1234",
        helped: "yes",
        review: 1,
      };
    feedbackConversation =  _.clone(feedback);
    feedbackConversation.conversationId = "123";
    conversation = new OrchestratorService();
    done();
});

describe("Test OrchestratorService sendMessage", () => {
  it("Test sendMessage context empty", (done) => {
    nock(get("orchestrator.url_api"))
    .post("/api/message")
    .reply(200, response);
    let actual: any;
    conversation.sendMessage({}).subscribe(
        (data) => actual = data,
        (error) => logger.error(error),
        () => {
          expect(actual).to.deep.equal(response);
          done();
        },
    );
  });

  it("Test sendMessage cors validation", (done) => {
    nock(get("orchestrator.url_api"))
    .post("/api/message")
    .reply(500, corsRes);
    let actual: any;
    conversation.sendMessage({}).subscribe(
        (data) => actual = data,
        (error) => {
          expect(error).to.include("/api/message");
          expect(error).to.not.equal(null);
          done();
        },
        () => { logger.debug(actual); },
    );
  });
  it("Test sendMessage statusCode 404", (done) => {
    nock(get("orchestrator.url_api"))
    .post("/api");
    let actual: any;
    conversation.sendMessage({}).subscribe(
        (data) => actual = data,
        (error) => {
          expect(error.status).to.not.equal(null);
          expect(error.status).to.equal(404);
          done();
        },
        () => { logger.debug(actual); },
    );
  });

  it("Test sendFeedback body empty", (done) => {
    nock(get("orchestrator.url_api"))
    .post("/api/feedback/")
    .reply(200, {});
    let actual: any;
    conversation.sendFeedback({}).subscribe(
        (data) => actual = data,
        (error) => logger.error(error),
        () => {
          expect(actual).to.deep.equal({});
          done();
        },
    );
  });

  it("Test sendFeedback body feedback", (done) => {
    nock(get("orchestrator.url_api"))
    .post("/api/feedback/1234")
    .reply(200, {});
    let actual: any;
    conversation.sendFeedback(feedback).subscribe(
        (data) => actual = data,
        (error) => logger.error(error),
        () => {
          expect(actual).to.deep.equal({});
          done();
        },
    );
  });
});

describe("Test OrchestratorService consecutiveMessage", () => {
  it("Test sendMessage consecutiveMessage No ID", (done) => {
    nock(get("orchestrator.url_api"))
    .post("/api/message")
    .reply(200, response);
    let actual: any;
    const contextNoID = _.clone(contextMessage);
    delete contextNoID.context.sender_psid;
    conversation.consecutiveMessage(contextNoID).subscribe(
        (data) => actual = data,
        (error) => {
          logger.error(error);
        },
        () => {
          expect(actual).to.deep.equal(response);
          logger.debug(actual);
          done();
        },
    );
  });
  it("Test sendMessage consecutiveMessage simple", (done) => {
    nock(get("orchestrator.url_api"))
    .post("/api/message")
    .reply(200, response);
    let actual: any;
    conversation.consecutiveMessage(contextMessage).subscribe(
        (data) => actual = data,
        (error) => {
          logger.error(error);
        },
        () => {
          expect(actual).to.deep.equal(response);
          logger.debug(actual);
          done();
        },
    );
  });
  it("Test sendMessage consecutiveMessage Consecutive", (done) => {
    nock(get("orchestrator.url_api"))
    .post("/api/message")
    .reply(200, response);
    let actual: any;
    conversation.consecutiveMessage(contextMessage).subscribe(
        (data) => actual = data,
        (error) => {
          logger.error(error);
        },
        () => {
          expect(actual).to.deep.equal(response);
          logger.debug(actual);
          done();
        },
    );

    const nextMessage = _.clone(contextMessage);
    setTimeout(() => {
      nextMessage.input.text = " Amigo";
      conversation.consecutiveMessage(nextMessage).subscribe(
          (data) => actual = data,
          (error) => {
            logger.error(error);
          },
          () => {
            expect(actual).to.deep.equal(response);
            logger.debug(actual);
            done();
          },
      );
    }, 1000);
  });
});

describe("Test OrchestratorService sendFeedback", () => {
  it("Test sendMessage sendFeedback empty", (done) => {
    nock(get("orchestrator.url_api"))
    .post("/api/feedback/123")
    .reply(200, {});
    let actual: any;
    conversation.sendFeedback({}).subscribe(
        (data) => actual = data,
        (error) => {
          expect(error.status).to.not.equal(null);
          expect(error.status).to.deep.equal(404);
          done();
        },
        () => {
          logger.debug(actual);
        },
    );
  });
  it("Test sendMessage sendFeedback no conversation_id", (done) => {
    nock(get("orchestrator.url_api"))
    .post("/api/feedback/123")
    .reply(200, {});
    let actual: any;
    conversation.sendFeedback(feedback).subscribe(
        (data) => actual = data,
        (error) => {
          expect(error.status).to.not.equal(null);
          expect(error.status).to.deep.equal(404);
          done();
        },
        () => {
          logger.debug(actual);
        },
    );
  });
  it("Test sendMessage sendFeedback conversation_id", (done) => {
    nock(get("orchestrator.url_api"))
    .post("/api/feedback/123")
    .reply(200, {});
    let actual: any;
    conversation.sendFeedback(feedbackConversation).subscribe(
        (data) => actual = data,
        (error) => {
          logger.error(error);
        },
        () => {
          expect(actual).to.not.equal(null);
          expect(actual).to.deep.equal({});
          done();
        },
    );
  });
});

after((done) => {
  Object.keys(RedisClients).forEach((key) => {
    if (RedisClients[key]) {
       RedisClients[key].quit();
     }
  });
  done();
});
