import { Slice, Fragment } from "@tiptap/pm/model";
import { ReplaceStep } from "@tiptap/pm/transform";
import { Selection } from "@tiptap/pm/state";

export const GetCurrentNode = function (editor, depth = 0) {
  const { $anchor, $from } = editor.view.state.selection;

  const nodeAfter = $from.nodeAfter;
  if (nodeAfter && nodeAfter.type.name === 'horizontalRule') {
    return { ...nodeAfter, depth: $anchor.depth + 1, parent: $anchor.node($anchor.depth) };
  }

  if (editor.view.lastSelectedViewDesc && editor.view.lastSelectedViewDesc.node.type.name === 'horizontalRule') {
    const hrNode = editor.view.lastSelectedViewDesc.node;
    return { ...hrNode, depth: $anchor.depth + 1, parent: $anchor.node($anchor.depth) };
  }

  let lookingDepth = ($anchor.depth - depth > 1) ? $anchor.depth - depth : 1;
  let node = $anchor.node(lookingDepth);

  if (node && node.type.name === 'paragraph' && lookingDepth !== 1) {
    node = null;
  }

  while (!node && depth < $anchor.depth) {
    depth++;
    lookingDepth = $anchor.depth - depth;
    if (lookingDepth < 0) break;
    node = $anchor.node(lookingDepth);
  }

  if (node) {
    let parentNode = lookingDepth > 1 ? $anchor.node(lookingDepth - 1) : null;
    return {
      ...node,
      depth: lookingDepth,
      parent: parentNode,
      type: { ...node.type, name: node.type.name === 'listItem' ? 'bulletList' : node.type.name }
    };
  }
  
  return null;
}

export const GetCurrentBlockCoords = function (editor) {
  const { state, view } = editor;
  const { selection } = state;
  const node = editor.commands.getCurrentNode();
  if (!node) {
    return new DOMRect(0, 0, 0, 0);
  }
  const pos = selection.$anchor.before(node.depth);
  const coords = view.coordsAtPos(pos);
  return new DOMRect(coords.left, coords.top, 0, 0);
};


export const GetCurrentBlockEndCoords = function (editor) {
  const pos = editor.view.state.selection.from;
  const element = editor.$pos(pos).element
  if(element){
    const coords = element.getBoundingClientRect();
    return new DOMRect(coords.x + coords.width - 50, coords.top + (coords.height / 2) , 0, 0);
  } 
  return new DOMRect(0, 0, 0, 0);
};

// export const GetTableRowCoords = function (view) {
//   const pos = view.state.selection.$from;
//   let depth = pos.depth;
//   while (depth > 1) {
//     if (pos.node(depth).type.name == "tableRow") break;
//     depth--;
//   }
//   let from = pos.before(depth);
//   let rect = view.nodeDOM(from).getBoundingClientRect();
//   return new DOMRect(rect.x, rect.y, rect.width, rect.height);
// };

// export const GetTableColumnCoords = function (view) {
//   const pos = view.state.selection.$from;
//   let depth = pos.depth,
//     cellDepth = 0,
//     tableDepth = 0;
//   while (depth > 0) {
//     if (
//       pos.node(depth).type.name == "tableCell" ||
//       pos.node(depth).type.name == "tableHeader"
//     ) {
//       cellDepth = depth;
//     }
//     if (pos.node(depth).type.name == "table") {
//       tableDepth = depth;
//       break;
//     }
//     depth--;
//   }
//   if (!(tableDepth && cellDepth)) {
//     return false;
//   }
//   let cellRect = view.nodeDOM(pos.before(cellDepth)).getBoundingClientRect();
//   let tableRect = view.nodeDOM(pos.before(tableDepth)).getBoundingClientRect();

//   return new DOMRect(cellRect.x, tableRect.y, cellRect.width, tableRect.height);
// };

export const GetTopLevelNode = function (view) {
  const selectionStart = view.state.selection.$from;
  if (selectionStart.node(1) == null && view.lastSelectedViewDesc) {
    return view.lastSelectedViewDesc.node;
  }
  return selectionStart.node(1);
};

let mapChildren = function (node, callback) {
  const array = [];
  for (let i = 0; i < node.childCount; i++) {
    array.push(
      callback(node.child(i), i, node instanceof Fragment ? node : node.content)
    );
  }
  return array;
};

// export const DragNode = function ({
//   view,
//   state,
//   draggedNodePosition,
//   targetNodePosition,
// }) {
//   let targetResolved = state.doc.resolve(targetNodePosition);
//   let draggedNode = state.doc.resolve(draggedNodePosition).node(1);
//   let targetNode = targetResolved.node(1) ?? targetResolved.nodeAfter;

//   // Get document; children; start and end – always the same!
//   const parent = targetResolved.node(0);
//   const parentPos = targetResolved.start(0);
//   let tr = view.state.tr;
//   const arr = mapChildren(parent, (node) => node);
//   let replaceStart = parentPos;
//   let replaceEnd = targetResolved.end(0);

//   let fromIndex = arr.indexOf(draggedNode);
//   let targetIndex = arr.indexOf(targetNode);

//   // Index is different when target is after dragged node
//   if (targetIndex > fromIndex) {
//     --targetIndex;
//   }
//   let arrItem = arr[fromIndex];

//   arr.splice(fromIndex, 1);
//   arr.splice(targetIndex, 0, arrItem);

//   const slice = new Slice(Fragment.fromArray(arr), 0, 0);
//   tr.step(new ReplaceStep(replaceStart, replaceEnd, slice, false));
//   tr.setSelection(Selection.near(tr.doc.resolve(targetNodePosition)));
//   view.dispatch(tr);
// };

export const MoveNode = function ({ view, dir, currentResolved }) {
  if (!currentResolved) {
    return false;
  }
  let tr = view.state.tr;
  const isDown = dir === "DOWN";
  const currentNode = currentResolved.node(1) || currentResolved.nodeAfter;
  const parentDepth = 0;
  const parent = currentResolved.node(parentDepth);
  const parentPos = currentResolved.start(parentDepth);

  const arr = mapChildren(parent, (node) => node);
  let index = arr.indexOf(currentNode);

  if (index == -1) {
    return false;
  }

  let swapWithIndex = isDown ? index + 1 : index - 1;

  // If swap is out of bound
  if (swapWithIndex >= arr.length || swapWithIndex < 0) {
    return false;
  }

  const swapWithNodeSize = arr[swapWithIndex].nodeSize;
  [arr[index], arr[swapWithIndex]] = [arr[swapWithIndex], arr[index]];

  let replaceStart = parentPos;
  let replaceEnd = currentResolved.end(parentDepth);

  const slice = new Slice(Fragment.fromArray(arr), 0, 0);
  tr.step(new ReplaceStep(replaceStart, replaceEnd, slice, false));

  tr.setSelection(
    Selection.near(
      tr.doc.resolve(
        isDown
          ? currentResolved.pos + swapWithNodeSize
          : currentResolved.pos - swapWithNodeSize
      )
    )
  );

  view.dispatch(tr);
};
