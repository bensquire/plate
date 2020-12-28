/** @jsx jsx */
import { jsx } from "@udecode/slate-plugins-test-utils";
import { Editor, Transforms } from "slate";
import { withHistory } from "slate-history";
import { withNodeID } from "../../../plugins/node-id/withNodeID";
import { idCreatorFixture } from "./fixtures";

const input = ((
  <editor>
    <hp id={10}>
      test
      <cursor />
    </hp>
  </editor>
) as any) as Editor;

const output = (
  <editor>
    <hp id={10}>test</hp>
    <hp id={1}>inserted</hp>
    <hp id={2}>inserted</hp>
  </editor>
) as any;

it("should reset the id", () => {
  const editor = withNodeID({
    idCreator: idCreatorFixture,
    resetExistingID: true,
  })(withHistory(input));

  Transforms.insertNodes(
    editor,
    (
      <fragment>
        <hp id={11}>inserted</hp>
        <hp id={12}>inserted</hp>
      </fragment>
    ) as any
  );

  expect(input.children).toEqual(output.children);
});