import { LightningElement, wire } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import FIRST_NAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LAST_NAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';

export default class TestingCom extends NavigationMixin(LightningElement) {
    pageRef;
    openModal = false; // Reactive property

    @wire(CurrentPageReference)
    wiredPageRef(newPageRef) {
        if (newPageRef) {
            this.pageRef = newPageRef;
            this.openModal = newPageRef.state?.c__openModal === 'true';
        }
    }

    get openModal1() {
        console.log('this.openModal:', this.openModal);
        return this.openModal;
    }

    closeModal() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: '003dM00000AybyDQAR',
                objectApiName: 'Contact',
                actionName: 'view'
            },
            state: {
                c__openModal: 'false'
            }
        });
    }

    firstName = '';
    lastName = '';
    email = '';
    phone = '';

    // Handle form field changes
    handleChange(event) {
        const field = event.target.name;
        if (field === 'firstName') {
            this.firstName = event.target.value;
        } else if (field === 'lastName') {
            this.lastName = event.target.value;
        } else if (field === 'email') {
            this.email = event.target.value;
        } else if (field === 'phone') {
            this.phone = event.target.value;
        }
    }

    // Handle Save button click
    handleSave() {
        const fields = {};
        fields[FIRST_NAME_FIELD.fieldApiName] = this.firstName;
        fields[LAST_NAME_FIELD.fieldApiName] = this.lastName;
        fields[EMAIL_FIELD.fieldApiName] = this.email;
        fields[PHONE_FIELD.fieldApiName] = this.phone;

        const recordInput = { apiName: CONTACT_OBJECT.objectApiName, fields };

        createRecord(recordInput)
            .then((contact) => {
                this.showToast('Success', 'Contact created successfully', 'success');

                // Clear form fields after successful save
                this.firstName = '';
                this.lastName = '';
                this.email = '';
                this.phone = '';

                this.closeModal(); // Close modal after success
            })
            .catch((error) => {
                this.showToast('Error', 'There was an error creating the contact', 'error');
                console.error(error);
            });
    }

    // Show toast messages
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    }
}
