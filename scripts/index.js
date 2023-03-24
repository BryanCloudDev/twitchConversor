(async function () {
	const valueFields = document.querySelectorAll("#value-1, #value-2");
	const changeCurrencyBtn = document.getElementById("convert-btn");
  const responseField = document.getElementById("response");
	const sendBtn = document.getElementById("send-btn");
	const amount = document.getElementById("amount");
  const alert = document.getElementById("alert");

	changeCurrencyBtn.addEventListener("click", function (e) {
    if (!responseField.classList.contains("d-none")){
      responseField.classList.add("d-none");
      responseField.querySelector("p").innerHTML = "";
      amount = 0;
    }
    e.preventDefault();
		toggleCurrency(valueFields);
	});

	sendBtn.addEventListener("click", function (e) {
		e.preventDefault();
    const [value1] = valueFields;

    if (!amount.value) {
					let errorMessage =
						value1.value === "Dolares"
							? "La cantidad minima de dolares son $1.40 crack"
							: "La cantidad minima de bits son 100 crack";

					alert.innerHTML = errorMessage;
					alert.classList.remove("d-none");

					setTimeout(() => {
						alert.classList.add("d-none");
					}, 3000);

					return false;
				}

    const parsedAmount = parseFloat(amount.value);
    let total;

    if (value1.value === "Dolares") {
      const dollarsToBitsResponse = Math.ceil(dollarsToBits(parsedAmount)).toLocaleString();
      total = `Son ${dollarsToBitsResponse} bits aproximadamente`;
    } else {
      const BitsTodollarsResponse = Math.ceil(bitsToDollars(parsedAmount)).toLocaleString();
      total = `Son ${BitsTodollarsResponse} dolares aproximadamente`;
    }

    responseField.classList.remove("d-none");
    responseField.querySelector("p").innerHTML = total;

	});

  amount.addEventListener("input", function() {
    let value = parseFloat(this.value);

    if(value > 1000000){
      alert.innerHTML = "Cantidades mayores a 1 millon no son permitidas";
      alert.classList.remove("d-none");
    }

    else if (value < 1) {
      alert.innerHTML = "Cantidades menores a 1 no son permitidas";
			alert.classList.remove("d-none");
		}

    else {
      if(!alert.classList.contains("d-none")){
        alert.classList.add("d-none");
      }
    }
  });

})();

function toggleCurrency(valueFields) {
  valueFields.forEach((field) => {
    field.value = field.value === "Bits" ? "Dolares" : "Bits";

    field.value === "Bits"
      ? field.previousElementSibling.querySelector("img").setAttribute("src", "../images/twitch.svg")
      : field.previousElementSibling.querySelector("img").setAttribute("src", "../images/dollar.svg");
  });
};

// Función para convertir de bits a dólares
function bitsToDollars(bits) {
  if (bits >= 25000) {
    return bits * 0.01232;
  } else if (bits >= 10000) {
    return bits * 0.0126;
  } else if (bits >= 5000) {
    return bits * 0.01288;
  } else if (bits >= 1500) {
    return bits * 0.0133;
  } else if (bits >= 500) {
    return bits * 0.014;
  } else if (bits >= 100) {
    return bits * 0.014;
  } else {
    return 0;
  }
}

// Función para convertir de dólares a bits
function dollarsToBits(dollars) {
  if (dollars >= 308) {
    return dollars / 0.01232;
  } else if (dollars >= 126) {
    return dollars / 0.0126;
  } else if (dollars >= 64.4) {
    return dollars / 0.01288;
  } else if (dollars >= 19.95) {
    return dollars / 0.0133;
  } else if (dollars >= 7) {
    return dollars / 0.014;
  } else if (dollars >= 1.4) {
    return dollars / 0.014;
  } else {
    return 0;
  }
}