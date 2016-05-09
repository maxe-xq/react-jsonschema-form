import { expect } from "chai";
import { Simulate } from "react-addons-test-utils";

import { createFormComponent, createSandbox } from "./test_utils";


describe("NumberField", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("TextWidget", () => {
    it("should render a string field", function*() {
      const {node} = createFormComponent({schema: {
        type: "number"
      }});

      expect(node.querySelectorAll(".field input[type=text]"))
        .to.have.length.of(1);
    });

    it("should render a string field with a label", function*() {
      const {node} = createFormComponent({schema: {
        type: "number",
        title: "foo"
      }});

      expect(node.querySelector(".field label").textContent)
        .eql("foo");
    });

    it("should render a string field with a placeholder", function*() {
      const {node} = createFormComponent({schema: {
        type: "number",
        description: "bar",
      }});

      expect(node.querySelector(".field input").getAttribute("placeholder"))
        .eql("bar");
    });

    it("should default state value to undefined", function*() {
      const {comp} = createFormComponent({schema: {type: "number"}});

      expect(comp.state.formData).eql(undefined);
    });

    it("should assign a default value", function*() {
      const {node} = createFormComponent({schema: {
        type: "number",
        default: 2,
      }});

      expect(node.querySelector(".field input").value)
        .eql("2");
    });

    it("should handle a change event", function*() {
      const {comp, node} = createFormComponent({schema: {
        type: "number",
      }});

      Simulate.change(node.querySelector("input"), {
        target: {value: "2"}
      });

      expect(comp.state.formData).eql(2);
    });

    it("should fill field with data", function*() {
      const {node} = createFormComponent({schema: {
        type: "number",
      }, formData: 2});

      expect(node.querySelector(".field input").value)
        .eql("2");
    });

    it("should not cast the input as a number if it ends with a dot", function*() {
      const {comp, node} = createFormComponent({schema: {
        type: "number",
      }});

      Simulate.change(node.querySelector("input"), {
        target: {value: "2."}
      });

      expect(comp.state.formData).eql("2.");
    });

    it("should render the widget with the expected id", function*() {
      const {node} = createFormComponent({schema: {
        type: "number",
      }});

      expect(node.querySelector("input[type=text]").id)
        .eql("root");
    });
  });

  describe("SelectWidget", () => {
    it("should render a number field", function*() {
      const {node} = createFormComponent({schema: {
        type: "number",
        enum: [1, 2]
      }});

      expect(node.querySelectorAll(".field select"))
        .to.have.length.of(1);
    });

    it("should render a string field with a label", function*() {
      const {node} = createFormComponent({schema: {
        type: "number",
        enum: [1, 2],
        title: "foo",
      }});

      expect(node.querySelector(".field label").textContent)
        .eql("foo");
    });

    it("should render a select field with a tooltip", function*() {
      const {node} = createFormComponent({schema: {
        type: "number",
        enum: [1, 2],
        description: "baz",
      }});

      expect(node.querySelector(".field select").getAttribute("title"))
        .eql("baz");
    });

    it("should assign a default value", function*() {
      const {comp} = createFormComponent({schema: {
        type: "number",
        enum: [1, 2],
        default: 1,
      }});

      expect(comp.state.formData).eql(1);
    });

    it("should handle a change event", function*() {
      const {comp, node} = createFormComponent({schema: {
        type: "number",
        enum: [1, 2],
      }});

      Simulate.change(node.querySelector("select"), {
        target: {value: "2"}
      });

      expect(comp.state.formData).eql(2);
    });

    it("should fill field with data", function*() {
      const {comp} = createFormComponent({schema: {
        type: "number",
        enum: [1, 2],
      }, formData: 2});

      expect(comp.state.formData).eql(2);
    });

    it("should render the widget with the expected id", function*() {
      const {node} = createFormComponent({schema: {
        type: "number",
        enum: [1, 2]
      }});

      expect(node.querySelector("select").id)
        .eql("root");
    });
  });
});
