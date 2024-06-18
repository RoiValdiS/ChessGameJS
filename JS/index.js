let cell;
let tool;
let color;
let flag = 0;
let smartColor;

let rookSwitchFlag  = 0;

function init() {
  color = "white";
  setClicks();
}
function resetColors() {
  let tds = document.querySelectorAll("td");
  for (let t in tds) {
    if (tds[t].className == "white") {
      tds[t].style.backgroundColor = "white";
    }
    if (tds[t].className == "black") {
      tds[t].style.backgroundColor = "gray";
    }
    tds[t].onclick = "";
  }
}
function setClicks() {
 
  let imgs = document.querySelectorAll("img");
  for (let i in imgs) {
    if (imgs[i].src != undefined) {
      if (imgs[i].src.includes(color)) {
        imgs[i].onclick = showSteps;
      } else {
        imgs[i].onclick = "";
      }
    }
  }
}
function showSteps() {
  resetColors();
  setClicks();
  let cellsToMove = calculateCellsToMove(this);
  for (let i in cellsToMove) {
    if (document.getElementById(cellsToMove[i]) != null) {
      if (!ifSmartChess(cellsToMove[i])) {
        document.getElementById(cellsToMove[i]).style.backgroundColor = "green";
        document.getElementById(cellsToMove[i]).onclick = moveTool;
      }
    }
  }
}
function ifSmartChess(el) {
  let orginial = cell;
  let newC = el;
  let jo = tool;
  let img1;
  if (document.getElementById(orginial).firstChild != null) {
    if (document.getElementById(orginial).firstChild.src != null) {
      img1 = document.getElementById(orginial).firstChild.src;
    }
  }
  let img2;
  if (document.getElementById(newC).firstChild != null) {
    if (document.getElementById(newC).firstChild.src != null) {
      img2 = document.getElementById(newC).firstChild.src;
      tool = jo;
    }
  }
  document.getElementById(orginial).innerHTML = "";
  document.getElementById(newC).innerHTML = '<img src="' + img1 + '">';
  tool = jo;
  flag = 1;
  smartColor = color;
  if (ifChess()) {
    document.getElementById(orginial).innerHTML = '<img src="' + img1 + '">';
    if (img2 == null) {
      document.getElementById(newC).innerHTML = "";
      tool = jo;
    } else {
      document.getElementById(newC).innerHTML = '<img src="' + img2 + '">';
      tool = jo;
    }
    cell = orginial;
    flag = 0;
    tool = jo;
    return true;
  }
  document.getElementById(orginial).innerHTML = '<img src="' + img1 + '">';
  if (img2 == null) {
    document.getElementById(newC).innerHTML = "";
  } else {
    document.getElementById(newC).innerHTML = '<img src="' + img2 + '">';
  }
  cell = orginial;
  tool = jo;
  flag = 0;
  return false;
}
function calculateCellsToMove(el) {
  if (el == null) return;
  let newCells = [];
  tool = el.src.split("/")[6].split(".")[0];
  cell = el.parentElement.id;
  if (tool == "ragli") {
    if (color == "white") {
      let A = String(Number(cell[0]) + 1) + (Number(cell[1]) + 1);
      let B = String(Number(cell[0]) + 1) + (Number(cell[1]) - 1);
      eatSign(A) != null ? newCells.push(eatSign(A)) : null;
      eatSign(B) != null ? newCells.push(eatSign(B)) : null;
      if (
        document.getElementById(Number(cell[0]) + 1 + cell[1]).firstChild !=
        null
      ) {
        return newCells;
      }
      newCells.push(Number(cell[0]) + 1 + cell[1]);
      if (cell[0] == 1) {
        if (
          document.getElementById(Number(cell[0]) + 2 + cell[1]).firstChild !=
          null
        ) {
          return newCells;
        }
        newCells.push(Number(cell[0]) + 2 + cell[1]);
      }
    }
    if (color == "black") {
      let A = String(Number(cell[0]) - 1) + (Number(cell[1]) - 1);
      let B = String(Number(cell[0]) - 1) + (Number(cell[1]) + 1);
      eatSign(A) != null ? newCells.push(eatSign(A)) : null;
      eatSign(B) != null ? newCells.push(eatSign(B)) : null;
      if (
        document.getElementById(Number(cell[0]) - 1 + cell[1]).firstChild !=
        null
      ) {
        return newCells;
      }
      newCells.push(Number(cell[0]) - 1 + cell[1]);
      if (cell[0] == 6) {
        if (
          document.getElementById(Number(cell[0]) - 2 + cell[1]).firstChild !=
          null
        ) {
          return newCells;
        }
        newCells.push(Number(cell[0]) - 2 + cell[1]);
      }
    }
  }
  if (tool == "horse") {
    let A = String(Number(cell[0]) + 2) + String(Number(cell[1]) + 1);
    let B = String(Number(cell[0]) + 2) + String(Number(cell[1]) - 1);
    let C = String(Number(cell[0]) + 1) + String(Number(cell[1]) + 2);
    let D = String(Number(cell[0]) + 1) + String(Number(cell[1]) - 2);
    let E = String(Number(cell[0]) - 2) + String(Number(cell[1]) + 1);
    let F = String(Number(cell[0]) - 2) + String(Number(cell[1]) - 1);
    let G = String(Number(cell[0]) - 1) + String(Number(cell[1]) + 2);
    let H = String(Number(cell[0]) - 1) + String(Number(cell[1]) - 2);

    document.getElementById(A) == null
      ? null
      : document.getElementById(A).firstChild == null
      ? newCells.push(A)
      : eatSign(A) != null
      ? newCells.push(eatSign(A))
      : null;
    document.getElementById(B) == null
      ? null
      : document.getElementById(B).firstChild == null
      ? newCells.push(B)
      : eatSign(B) != null
      ? newCells.push(eatSign(B))
      : null;
    document.getElementById(C) == null
      ? null
      : document.getElementById(C).firstChild == null
      ? newCells.push(C)
      : eatSign(C) != null
      ? newCells.push(eatSign(C))
      : null;
    document.getElementById(D) == null
      ? null
      : document.getElementById(D).firstChild == null
      ? newCells.push(D)
      : eatSign(D) != null
      ? newCells.push(eatSign(D))
      : null;
    document.getElementById(E) == null
      ? null
      : document.getElementById(E).firstChild == null
      ? newCells.push(E)
      : eatSign(E) != null
      ? newCells.push(eatSign(E))
      : null;
    document.getElementById(F) == null
      ? null
      : document.getElementById(F).firstChild == null
      ? newCells.push(F)
      : eatSign(F) != null
      ? newCells.push(eatSign(F))
      : null;
    document.getElementById(G) == null
      ? null
      : document.getElementById(G).firstChild == null
      ? newCells.push(G)
      : eatSign(G) != null
      ? newCells.push(eatSign(G))
      : null;
    document.getElementById(H) == null
      ? null
      : document.getElementById(H).firstChild == null
      ? newCells.push(H)
      : eatSign(H) != null
      ? newCells.push(eatSign(H))
      : null;
  }
  if (tool == "bishop") {
    let i = cell[0];
    let j = cell[1];
    while (i < 8) {
      i++;
      j++;
      let check = String(Number(i)) + Number(j);
      if (document.getElementById(check) != null) {
        if (document.getElementById(check).firstChild == null) {
          newCells.push(check);
        } else {
          if (eatSign(check) != null) {
            newCells.push(check);
            break;
          } else {
            break;
          }
        }
      }
    }
    i = cell[0];
    j = cell[1];
    while (i > 0) {
      i--;
      j++;
      let check = String(Number(i)) + Number(j);
      if (document.getElementById(check) != null) {
        if (document.getElementById(check).firstChild == null) {
          newCells.push(check);
        } else {
          if (eatSign(check) != null) {
            newCells.push(check);
            break;
          } else {
            break;
          }
        }
      }
    }
    i = cell[0];
    j = cell[1];
    while (i > 0) {
      i--;
      j--;
      let check = String(Number(i)) + Number(j);
      if (document.getElementById(check) != null) {
        if (document.getElementById(check).firstChild == null) {
          newCells.push(check);
        } else {
          if (eatSign(check) != null) {
            newCells.push(check);
            break;
          } else {
            break;
          }
        }
      }
    }
    i = cell[0];
    j = cell[1];
    while (i < 8) {
      i++;
      j--;
      let check = String(Number(i)) + Number(j);
      if (document.getElementById(check) != null) {
        if (document.getElementById(check).firstChild == null) {
          newCells.push(check);
        } else {
          if (eatSign(check) != null) {
            newCells.push(check);
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  if (tool == "rook") {
    let row = cell[0];
    let col = cell[1];
    while (row < 8) {
      row++;
      let check = String(Number(row)) + Number(col);
      if (document.getElementById(check) != null) {
        if (document.getElementById(check).firstChild == null) {
          newCells.push(check);
        } else {
          if (eatSign(check) != null) {
            newCells.push(check);
            break;
          } else {
            break;
          }
        }
      }
    }
    row = cell[0];
    col = cell[1];
    while (row > 0) {
      row--;
      let check = String(Number(row)) + Number(col);
      if (document.getElementById(check) != null) {
        if (document.getElementById(check).firstChild == null) {
          newCells.push(check);
        } else {
          if (eatSign(check) != null) {
            newCells.push(check);
            break;
          } else {
            break;
          }
        }
      }
    }
    row = cell[0];
    col = cell[1];
    while (col > 0) {
      col--;
      let check = String(Number(row)) + Number(col);
      if (document.getElementById(check) != null) {
        if (document.getElementById(check).firstChild == null) {
          newCells.push(check);
        } else {
          if (eatSign(check) != null) {
            newCells.push(check);
            break;
          } else {
            break;
          }
        }
      }
    }
    row = cell[0];
    col = cell[1];
    while (col < 8) {
      col++;
      let check = String(Number(row)) + Number(col);
      if (document.getElementById(check) != null) {
        if (document.getElementById(check).firstChild == null) {
          newCells.push(check);
        } else {
          if (eatSign(check) != null) {
            newCells.push(check);
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  if (tool == "queen") {
    let row = cell[0];
    let col = cell[1];
    while (row < 8) {
      row++;
      let check = String(Number(row)) + Number(col);
      if (document.getElementById(check) != null) {
        if (document.getElementById(check).firstChild == null) {
          newCells.push(check);
        } else {
          if (eatSign(check) != null) {
            newCells.push(check);
            break;
          } else {
            break;
          }
        }
      }
    }
    row = cell[0];
    col = cell[1];
    while (row > 0) {
      row--;
      let check = String(Number(row)) + Number(col);
      if (document.getElementById(check) != null) {
        if (document.getElementById(check).firstChild == null) {
          newCells.push(check);
        } else {
          if (eatSign(check) != null) {
            newCells.push(check);
            break;
          } else {
            break;
          }
        }
      }
    }
    row = cell[0];
    col = cell[1];
    while (col > 0) {
      col--;
      let check = String(Number(row)) + Number(col);
      if (document.getElementById(check) != null) {
        if (document.getElementById(check).firstChild == null) {
          newCells.push(check);
        } else {
          if (eatSign(check) != null) {
            newCells.push(check);
            break;
          } else {
            break;
          }
        }
      }
    }
    row = cell[0];
    col = cell[1];
    while (col < 8) {
      col++;
      let check = String(Number(row)) + Number(col);
      if (document.getElementById(check) != null) {
        if (document.getElementById(check).firstChild == null) {
          newCells.push(check);
        } else {
          if (eatSign(check) != null) {
            newCells.push(check);
            break;
          } else {
            break;
          }
        }
      }
    }
    let i = cell[0];
    let j = cell[1];
    while (i < 8) {
      i++;
      j++;
      let check = String(Number(i)) + Number(j);
      if (document.getElementById(check) != null) {
        if (document.getElementById(check).firstChild == null) {
          newCells.push(check);
        } else {
          if (eatSign(check) != null) {
            newCells.push(check);
            break;
          } else {
            break;
          }
        }
      }
    }
    i = cell[0];
    j = cell[1];
    while (i > 0) {
      i--;
      j++;
      let check = String(Number(i)) + Number(j);
      if (document.getElementById(check) != null) {
        if (document.getElementById(check).firstChild == null) {
          newCells.push(check);
        } else {
          if (eatSign(check) != null) {
            newCells.push(check);
            break;
          } else {
            break;
          }
        }
      }
    }
    i = cell[0];
    j = cell[1];
    while (i > 0) {
      i--;
      j--;
      let check = String(Number(i)) + Number(j);
      if (document.getElementById(check) != null) {
        if (document.getElementById(check).firstChild == null) {
          newCells.push(check);
        } else {
          if (eatSign(check) != null) {
            newCells.push(check);
            break;
          } else {
            break;
          }
        }
      }
    }
    i = cell[0];
    j = cell[1];
    while (i < 8) {
      i++;
      j--;
      let check = String(Number(i)) + Number(j);
      if (document.getElementById(check) != null) {
        if (document.getElementById(check).firstChild == null) {
          newCells.push(check);
        } else {
          if (eatSign(check) != null) {
            newCells.push(check);
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  if (tool == "king") {
    let A = Number(cell[0]) + 1 + String(cell[1]);
    let B = Number(cell[0]) - 1 + String(cell[1]);
    let C = Number(cell[0]) + String(Number(cell[1]) + 1);
    let D = Number(cell[0]) + String(Number(cell[1]) - 1);
    let E = Number(cell[0]) - 1 + String(Number(cell[1]) - 1);
    let F = Number(cell[0]) - 1 + String(Number(cell[1]) + 1);
    let G = Number(cell[0]) + 1 + String(Number(cell[1]) - 1);
    let H = Number(cell[0]) + 1 + String(Number(cell[1]) + 1);
    document.getElementById(A) == null
      ? null
      : document.getElementById(A).firstChild == null
      ? newCells.push(A)
      : eatSign(A) != null
      ? newCells.push(eatSign(A))
      : null;
    document.getElementById(B) == null
      ? null
      : document.getElementById(B).firstChild == null
      ? newCells.push(B)
      : eatSign(B) != null
      ? newCells.push(eatSign(B))
      : null;
    document.getElementById(C) == null
      ? null
      : document.getElementById(C).firstChild == null
      ? newCells.push(C)
      : eatSign(C) != null
      ? newCells.push(eatSign(C))
      : null;
    document.getElementById(D) == null
      ? null
      : document.getElementById(D).firstChild == null
      ? newCells.push(D)
      : eatSign(D) != null
      ? newCells.push(eatSign(D))
      : null;
    document.getElementById(E) == null
      ? null
      : document.getElementById(E).firstChild == null
      ? newCells.push(E)
      : eatSign(E) != null
      ? newCells.push(eatSign(E))
      : null;
    document.getElementById(F) == null
      ? null
      : document.getElementById(F).firstChild == null
      ? newCells.push(F)
      : eatSign(F) != null
      ? newCells.push(eatSign(F))
      : null;
    document.getElementById(G) == null
      ? null
      : document.getElementById(G).firstChild == null
      ? newCells.push(G)
      : eatSign(G) != null
      ? newCells.push(eatSign(G))
      : null;
    document.getElementById(H) == null
      ? null
      : document.getElementById(H).firstChild == null
      ? newCells.push(H)
      : eatSign(H) != null
      ? newCells.push(eatSign(H))
      : null;
    if (cell[0] == "0" && cell[1] == "3") {
      if (document.getElementById("02").firstChild == null) {
        if (document.getElementById("01").firstChild == null) {
          if (document.getElementById("00").firstChild != null) {
            if (document.getElementById("00").firstChild.src != null) {
              if (
                document.getElementById("00").firstChild.src.includes("rook")
              ) {
                newCells.push("01");
              }
            }
          }
        }
      }
    }
    if (cell[0] == "0" && cell[1] == "3") {
      if (document.getElementById("04").firstChild == null) {
        if (document.getElementById("05").firstChild == null) {
          if (document.getElementById("06").firstChild == null) {
            if (document.getElementById("07").firstChild != null) {
              if (document.getElementById("07").firstChild.src != null) {
                if (
                  document.getElementById("07").firstChild.src.includes("rook")
                ) {
                  newCells.push("06");
                }
              }
            }
          }
        }
      }
    }

    if (cell[0] == "7" && cell[1] == "3") {
      if (document.getElementById("72").firstChild == null) {
        if (document.getElementById("71").firstChild == null) {
          if (document.getElementById("70").firstChild != null) {
            if (document.getElementById("70").firstChild.src != null) {
              if (
                document.getElementById("70").firstChild.src.includes("rook")
              ) {
                newCells.push("71");
              }
            }
          }
        }
      }
    }
    if (cell[0] == "7" && cell[1] == "3") {
      if (document.getElementById("74").firstChild == null) {
        if (document.getElementById("75").firstChild == null) {
          if (document.getElementById("76").firstChild == null) {
            if (document.getElementById("77").firstChild != null) {
              if (document.getElementById("77").firstChild.src != null) {
                if (
                  document.getElementById("77").firstChild.src.includes("rook")
                ) {
                  newCells.push("76");
                }
              }
            }
          }
        }
      }
    }
  }
  return newCells;
}
function eatSign(point) {
  let p = document.getElementById(point);
  if (p != null) {
    if (p.firstChild != null) {
      if (p.firstChild.src.includes(color) == false) {
        return point;
      }
    }
  }
  return null;
}
function ifChess() {
  let t = tool;
  let tmpcell = cell;

  let tmpColor = color;
  let imgs = document.querySelectorAll("img");
  if (flag == 0) {
    for (let i in imgs) {
      if (imgs[i].src != undefined) {
        color = imgs[i].src.split("/")[5];

        let tmp = calculateCellsToMove(imgs[i]);
        tool = t;
        for (let t in tmp) {
          if (chessMove(document.getElementById(tmp[t]))) {
            tool = t;
            color = tmpColor;
            return true;
          }
        }
        tool = t;
        color = tmpColor;
      }
    }
  } else {
    for (let i in imgs) {
      if (imgs[i].src != undefined) {
        color = imgs[i].src.split("/")[5];
        if (color != smartColor) {
          let tmp = calculateCellsToMove(imgs[i]);
          tool = t;
          for (let t in tmp) {
            if (chessMove(document.getElementById(tmp[t]))) {
              tool = t;
              color = tmpColor;
              return true;
            }
          }
        }
        tool = t;
        color = tmpColor;
      }
    }
  }
  tool = t;
  return false;
}
function chessMove(el) {
  let tmp = el.firstChild;
  if (tmp != null) {
    if (tmp.src != null) {
      if (!tmp.src.includes(color)) {
        if (tmp.src.includes("king")) {
          if (flag == 0) {
            alert("CHESS");
          }
          return true;
        }
      }
    }
  }
}
function moveTool() {
  this.innerHTML = "";

  document.getElementById(cell).innerHTML = "";
  if (
    (tool == "ragli" && color == "white" && this.id[0] == 7) ||
    (tool == "ragli" && color == "black" && this.id[0] == 0)
  ) {
    this.innerHTML = "";
    let img = document.createElement("img");
    img.src = "./imgs/" + color + "/" + "queen" + ".png";
    this.append(img);
  } else {
    let img = document.createElement("img");
    img.src = "./imgs/" + color + "/" + tool + ".png";
    this.append(img);
  }
  ifChess();
  rookSwitchFlag = 0;
  color == "white" ? (color = "black") : (color = "white");
  resetColors();
  setClicks();
}
