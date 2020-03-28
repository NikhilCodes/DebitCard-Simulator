var app = new Vue({
    el: "#app",
    data: {
        flip: false,
        card_number_mask: "#### #### #### ####",
        card_user_name_arr: "---------------".split(''),
        card_number: "#### #### #### ####",
        card_number_input: "",
        card_user_name: "",
        card_expiry: "",
        cvv_number: "",
        card_expiry_value: "MM/YY",
        debit_card_bg: "card-bg.jpg",  // Check assets/image to know image names available
        text_color: "white",

        last_deleted_card_digit: "#",
        last_deleted_user_name_letter: " ",
        name_maxlen: "15",

        focus_card_number: false,
        focus_card_user_name: false,
        focus_card_expiry: false,
    },
    computed: {
        debit_card_bg_path: function () {
            return "url(../../assets/images/" + this.debit_card_bg + ")"
        },
        get_card_type: function () {
            let number = this.card_number_input
            let re = RegExp("^4")
            if (number.match(re) != null) return "visa"

            re = RegExp("^5[1-5]")
            if (number.match(re) != null) return "mastercard"

            return "visa"
        }
    },
    watch: {
        card_number_input: function (value, oldValue) {
            this.last_deleted_card_digit = oldValue[oldValue.length - 1]
        },
        card_user_name: function (value, oldValue) {
            this.last_deleted_user_name_letter = oldValue[oldValue.length - 1]
        },
        card_expiry: function (value, oldValue) {
            let year_month = value.split('-')
            this.card_expiry_value = year_month[1]+'/'+year_month[0].substring(2)
        },
    },
    methods: {
        flip_function: function () {
            this.flip = !this.flip
        },
        face_back: function () {
            this.flip = true
        },
        face_front: function () {
            this.flip = false
        },
        focus_in_card_number: function () {
            this.focus_card_number = true
        },
        focus_out_card_number: function () {
            this.focus_card_number = false
        },
        focus_in_card_name: function () {
            this.focus_card_user_name = true
        },
        focus_out_card_name: function () {
            this.focus_card_user_name = false
        },
        focus_in_card_expiry: function () {
            this.focus_card_expiry = true
        },
        focus_out_card_expiry: function () {
            this.focus_card_expiry = false
        },
        split_number_by_four: function (text) {
            let jump = 0
            let new_masked_text = ""
            for (let i = 0; i < text.length; i++) {
                if (text[i] == ' ' || !text[i].match(/[0-9]/))
                    continue

                new_masked_text += text[i]
                jump++;

                if (jump % 4 == 0) {
                    new_masked_text += ' '
                    jump = 0
                }
            }
            return new_masked_text.trim()
        },
        onCardNumberInputChange: function () {
            let split_text = this.split_number_by_four(this.card_number_input)
            this.card_number_input = split_text
            this.card_number = split_text + this.card_number_mask.substring(split_text.length)
        },
        onCardUserNameInputChange: function () {
            this.card_user_name = this.card_user_name.toUpperCase()
            for(let i=0;i<this.name_maxlen;i++) {
                if (this.card_user_name[i] == undefined) {
                    this.card_user_name_arr[i] = '-'
                    continue
                }
                this.card_user_name_arr[i] = this.card_user_name[i]
            }
        },
        only_cvv_number: function () {
            re = RegExp("[0-9]*")
            matched = this.cvv_number.match(re)
            this.cvv_number = matched[0]
        }
    },
})