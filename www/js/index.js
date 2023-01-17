document.addEventListener("deviceready", loadContacts, false);



function onSuccess(contacts) {
    let code = '';
    for (let i = 0; i < contacts.length; i++) {
        code += `<li onclick="showDetails(${contacts[i].id})">
                    <a href="#page3">
                        <img src="img/avatar.jpg">
                        <h2>${contacts[i].name.formatted}</h2>
                        <p>${contacts[i].phoneNumbers[0].value}</p>
                    </a>
                </li>
        `;
        let contactList = $('#contactList');
        contactList.html(code);
        contactList.listview('refresh');
    }
}

function showDetails(contactId) {
    var options = new ContactFindOptions();
    options.multiple = true;
    options.hasPhoneNumber = true;
    let fields = [contactId];
    navigator.contacts.find(fields, onSuccessShow, onError, options);
}

function onSuccessShow(contacts) {
    let code = "";
    code = `
    <form id="formAdd">
        <div class="ui-field-contain">
            <label>Nom</label>
            <input type="text" name="nom" id="nom" value="${contacts[0].name.givenName}"/><br/>
            <label>Prenom</label>
            <input type="text" name="prenom" id="prenom" value="${contacts[0].name.familyName}" />
            <label>Tel</label>
            <input type="text" name="tel" id="tel" value="${contacts[0].phoneNumbers[0].value}" />
        </div>
        <input type="submit" data-inline="true" value="Ajouter" onclick="createContact()">
    </form>
    `;
    let contactDetail = $('#contactDetail');
    contactDetail.html(code);
    contactDetail.listview('refresh');
}

function onError(contactError) {
    alert('Ereur detectée!');
};

function loadContacts() {
    var options = new ContactFindOptions();
    //options.filter   = "";
    options.multiple = true;
    //options.desiredFields = [navigator.contacts.fieldType.id];
    options.hasPhoneNumber = true;
    //var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
    let fields = ['name'];
    navigator.contacts.find(fields, onSuccess, onError, options);
}
/*
$(formAdd).submit(function(){
    createContact();
  });
*/
function createContact() {
    var contact = navigator.contacts.create();
    contact.displayName = "Kuni";
    contact.nickname = "Kuni";

    var name = new ContactName();
    name.givenName = prenom.value;
    name.familyName = nom.value;
    contact.phoneNumbers = [new ContactField('mobile', tel.value, true)];
    contact.name = name;

    contact.save(onSuccessAdd, onError);
}

function onSuccessAdd() {
    loadContacts();
}
