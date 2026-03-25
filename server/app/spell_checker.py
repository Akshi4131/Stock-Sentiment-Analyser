# spell_checker.py - Case-insensitive search with spell correction
import difflib

# Common Indian stock symbols
COMMON_STOCKS = [
    'RELIANCE', 'TCS', 'INFY', 'HDFC', 'ICICI', 'BAJAJ', 'LT', 'MARUTI',
    'SBIN', 'HDFCBANK', 'ICICIBANK', 'AXISBANK', 'BHARTIARTL', 'ITC',
    'SUNPHARMA', 'ASIANPAINT', 'DMART', 'NESTLEIND', 'WIPRO', 'JOHNSONSANIT',
    'KOTAKBANK', 'BAJAJFINSV', 'POWERGRID', 'HCLTECH', 'ONGC', 'COALINDIA',
    'ADANIPORTS', 'INFRATEL', 'GAIL', 'TATAMOTORS', 'MM', 'TITAN',
    'PIDILITIND', 'BHARTIAIRTEL', 'JSWSTEEL', 'ULTRACEMCO', 'EICHERMOT',
    'LUPIN', 'SAIL', 'BAJAJFINSV', 'ADANIGREEN', 'ADANIPOWER', 'AFL',
    'INDIGO', 'SPICEJET', 'MAHABANK', 'IOC', 'MRF', 'MOTHERSON', 'GBPLJEANS',
    'ESCORTS', 'GMR', 'THERMAX', 'SIEMENS', 'KPITTECH', 'HINDALCO',
    'NATIONALUM', 'RBLBANK', 'FEDERALBANK', 'IDBI', 'BAJAJHLDNG', 'BANDHANBNK',
    'TATAPOWER', 'TATASTEEL', 'SUNTV', 'PAGEIND', 'AUBANK', 'ACC'
]

def correct_stock_name(input_stock):
    """
    Correct misspelled stock names using fuzzy matching.
    Returns (corrected_name, confidence_score)
    """
    input_upper = input_stock.upper().strip()
    
    # Exact match
    if input_upper in COMMON_STOCKS:
        return input_upper, 1.0
    
    # Find close matches using difflib
    matches = difflib.get_close_matches(input_upper, COMMON_STOCKS, n=1, cutoff=0.6)
    
    if matches:
        return matches[0], 0.95  # High confidence fuzzy match
    
    # If no close match found, return original in uppercase
    return input_upper, 0.5


def normalize_stock_name(stock_name):
    """
    Normalize stock name: case-insensitive and spell correction
    Returns {'stock': corrected_name, 'original': original_input, 'was_corrected': bool}
    """
    if not stock_name:
        return None
    
    corrected, confidence = correct_stock_name(stock_name)
    original_upper = stock_name.upper().strip()
    was_corrected = corrected != original_upper
    
    return {
        'stock': corrected,
        'original': stock_name,
        'was_corrected': was_corrected,
        'confidence': confidence
    }
