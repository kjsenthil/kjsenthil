import moment from 'moment'

export default {
    "fields": {
        "status": "2",
        "category": 5,
        "description": "Retirementl",
        "capture_date": {
            "_val": moment().format("YYYY-MM-DD"),
            "_type": "Date"
        },
        "advice_type": 5,
        "regular_drawdown": {
            "_val": {
                "code": "GBP",
                "value": {
                    "_val": "233",
                    "_type": "BigDecimal"
                }
            },
            "_type": "Currency"
        },
        "objective_frequency_start_age": 65,
        "objective_frequency_end_age": 67,
        "drawdown_frequency": 12,
        "owner": "client"
    }
}