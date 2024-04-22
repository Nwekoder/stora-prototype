export function formatCurrency(input) {
    return "Rp. " + Intl.NumberFormat('id-ID', {currency: 'IDR'}).format(input)
}