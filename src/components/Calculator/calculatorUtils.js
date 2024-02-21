
var pool_volume = 0;

$(document).ready(function () {
    $('select').material_select();
});
//Pool Volume
function set_pool_volume(amount) {
    pool_volume = amount;
    calculate_all();
    console.log(pool_volume)
}

//Convertions 
function oz_to_lb(amount) {
    var conversion = amount * 0.0625;
    var result = amount + " oz. = " + conversion + " lbs.";
    $("#ans_oz_to_lb").html(result);
}

function floz_to_gal(amount) {
    var conversion = amount * 0.0078125;
    var result = amount + " fl.oz. = " + conversion + " gal.";
    $("#ans_floz_to_gal").html(result);
}

//Clear Reading entry fields
function clearReadings() {
    $("[id^=reading_]").each(function () {
        $(this).val(null);
    })
}
//Reset ideal values
function resetIdeals() {
    var orig = [5.0, 7.5, 100, 300, 50]
    $("[id^=ideal_]").each(function (index) {
        $(this).val(orig[index]);
    })
}
//Clear Chemical selection fields
function clearEntries() {
    $("select").each(function () {
        $(this).val("");
    });
    $("select").material_select();
}

function clearOutputs() {
    $("[id^=output_]").each(function (index) {
        $(this).text("");
    })
}
function clearAll() {
    clearReadings()
    resetIdeals()
    clearEntries()
    clearOutputs()
}
//calculations
function calculate_all() {
    calculate_caHardness();
    calculate_chlorine();
    calculate_stabilizer();
    calculate_alkalinity();
    calculate_ph();
}

function calculate_caHardness() {
    var readingInput = $("#reading_ca-hardness");
    var chemicalInput = $("#chemical_ca-hardness");
    var idealInput = $("#ideal_ca-hardness");
    if (readingInput.val().length > 0 && idealInput.val().length > 0 && chemicalInput.val() != null) {
        var reading = readingInput.val();
        var chemical = chemicalInput.val();
        var ideal = idealInput.val();
        var chemicalDosages = [0.9, 1.2];
        //Step 1
        var adjustment = Math.abs(ideal - reading);
        //Step 2
        var dosage = chemicalDosages[chemical];
        //Step 3
        const CA_PPM = 10;
        //Step 4
        //Step 5
        var step5 = adjustment / CA_PPM;
        //Step 6
        var step6 = pool_volume / 10000;
        //Step 7
        var result = dosage * step5 * step6;
        $("#output_ca-hardness").text(result.toFixed(2) + " lbs.");
    }
}

function calculate_chlorine() {
    var readingInput = $("#reading_chlorine");
    var chemicalInput = $("#chemical_chlorine");
    var idealInput = $("#ideal_chlorine");
    if (readingInput.val().length > 0 && idealInput.val().length > 0 && chemicalInput.val() != null) {
        var reading = readingInput.val();
        var chemical = chemicalInput.val();
        var ideal = idealInput.val();
        var chemicalDosages = [1.3, 2.0, 1.75, 10.7, 3.8, 1.5, 2.4, 2.1, 2.6, 2.4];
        //Step 1
        var adjustment = Math.abs(ideal - reading);
        //Step 2
        var dosage = chemicalDosages[chemical];
        //Step 3
        const CL_PPM = 1;
        //Step 4
        //Step 5
        var step5 = adjustment / CL_PPM;
        //Step 6
        var step6 = pool_volume / 10000;
        //Step 7
        var result = dosage * step5 * step6;
        var resultStr = "";
        if (chemical == 3) {
            resultStr = " fl. oz."
        } else {
            resultStr = " oz."
        }
        $("#output_chlorine").text(result.toFixed(2) + resultStr);
    }
}

function calculate_stabilizer() {
    var readingInput = $("#reading_stabilizer");
    var chemicalInput = $("#chemical_stabilizer");
    var idealInput = $("#ideal_stabilizer");
    if (readingInput.val().length > 0 && idealInput.val().length > 0 && chemicalInput.val() != null) {
        var reading = readingInput.val();
        var chemical = chemicalInput.val();
        var ideal = idealInput.val();
        var chemicalDosages = [13, 1.6];
        //Step 1
        var adjustment = Math.abs(ideal - reading);
        //Step 2
        var dosage = chemicalDosages[chemical];
        //Step 3
        const ST_PPM = 10;
        //Step 4
        //Step 5
        var step5 = adjustment / ST_PPM;
        //Step 6
        var step6 = pool_volume / 10000;
        //Step 7
        var result = dosage * step5 * step6;
        var resultStr = "";
        if (chemical == 0) {
            resultStr = " oz."
        } else {
            resultStr = " lbs."
        }
        $("#output_stabilizer").text(result.toFixed(2) + resultStr);
    }
}

function calculate_alkalinity() {
    var readingInput = $("#reading_total-alkalinity");
    var chemicalInput = $("#chemical_total-alkalinity");
    var idealInput = $("#ideal_total-alkalinity");
    if (readingInput.val().length > 0 && idealInput.val().length > 0 && chemicalInput.val() != null) {
        var reading = readingInput.val();
        var chemical = chemicalInput.val();
        var ideal = idealInput.val();
        var chemicalDosages = [1.4, 14, 1.25, 26.0, 2.1];
        //Step 1
        var adjustment = Math.abs(ideal - reading);
        //Step 2
        var dosage = chemicalDosages[chemical];
        //Step 3
        const AL_PPM = 10;
        //Step 4
        //Step 5
        var step5 = adjustment / AL_PPM;
        //Step 6
        var step6 = pool_volume / 10000;
        //Step 7
        var result = dosage * step5 * step6;
        var resultStr = "";
        if (chemical == 0 || chemical == 2 || chemical == 4) {
            resultStr = " lbs."
        } else if (chemical == 1) {
            resultStr = " oz."
        } else {
            resultStr = " fl. oz."
        }
        $("#output_total-alkalinity").text(result.toFixed(2) + resultStr);
    }
}

