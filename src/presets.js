const { combineRgb } = require('@companion-module/base')
const { respParam } = require('./consts.js')

const icons = {
	play: 'iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAe9QTFRFAAAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////HabMXAAAAKV0Uk5TAA02T041ETu49//7z38nA2zs54kfWf3eaQUy7dFBBKT4uikW6vWPGVP+1RCj2AHKuSXh7gniZvHJRPqrHvl7120PwD6elwjg/ByD3F/EPAKV8nMHvkUgSrtDm+ZLwyqaIWvdSHCmooFCsvYxNJ3HG5kL0nISUW+WJMVedQ6YvHhG31anZ++Twtto89PakSLkztY/rWVikvC2JmR6BrM6ValheWATCDkShgAAA7FJREFUeJzt3GdbE0EUhmEQFXJQqkYQVBBF1oJgRDSWIIIJIkoQVKwoig0L9t5FxY4NGyr6Q11sFxuyyZbZnMle7/0LzvMhmZnsZFNSAAAAAAAAAAAAAAAAAAAAAAAAAMCs1AlpEydN5p7CtvQMD6kyp0zN4h7FjuycXPonL38a9zjWTffSGDMKCrkHsmhmEWkVz5rNPZMlcyhSSelc7qEsKJs3LoRofvkC7rlMq1CihBAtLFjEPZlJi6N2EClL0iu5ZzNlqU6ImlJVnUwpy3RDiHzly7nHMy43RghRzYqkSamNGUK0clU294jGxAsh/+o13DMaEjeEaO26ZNgXGwghJVC3nnvOuIyEqOo3cA8aj8EQogbJzyqGQ8jXuJF72FiMhxAFcyReVcyEUKhU3rOKqRB1g9/YxD2xDpMh6rFrk5yriukQUpo3y7grNh+iprRs2co99zhWQtSv4lbpjvXWQojCbZJ9FVsNUc8qFdu4hx/Legj52zskOqvYCFE3+K3buef/z1aIuqq0ybLBtxlCFNjBnfCH7RCinZ0yLJACQsi3K4s/RUQI0W7+Db6YEKLiPcyriqgQ8u/d544Q9at4f5c7QoiaD/CdVYSGkHKwm2uDLzZElcG0wRceQkWHWBYV8SHkPcyxqDgQQtST6pIQ5YhLQih81CUhdMwtIccT/oO3QyF0wi0hCf+QOBXS65IQf8J/k3AopCXRHQ6FeCpcEnIy8Q+2HAmpKkt4hxMhyqnTie9wIEQ508fQIT7kbCdHhvCQknPneTrEhngYHzMIDAnVJ3yn6EhI3gXWy+iiQoIXGc7p4kPCly5zP1gQEeK90sGdISQkcJU/Q0BI+Np17obfbIb4b8hymdZWSOhmtzT//7ETUlMn0SUO6yG1t5hXDi3LIQ3V3KNrWQtR2m9zDx7J0g26O3cluhb0l4UQT76M1zNNh4TudXHPHJXJEH97pzQrh5a5kOB9iVYOLTMhD/qlWjm0jId4H7KfOWIxHCLH9TJ9BkMePZZjs67PUMiANJt1fQZCQj3J8NqB+CFPZLqmrC9eyNNkeXVC5IsStGqfPece0KgXMTKUKsnOHLG81M94NSjf3130vdbrGHgj+8qh9VYn4508/0Mwpul9lAz/0AfuuUyrHBrfEUxLipUjwuBAZMZH9nvulhR+0rwZxdffJfcuV9/n1jFvQfoyzD2ODZVfA5mjEd68b8mcMaqv9/vIyI/hn9xzAAAAAAAAAAAAAAAAAAAAAAAAAEDS+wVnEC+hb1Bg9wAAAABJRU5ErkJggg==',
	pause:
		'iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVBQTFRFAAAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////RqlzQwAAAHB0Uk5TAAMze8bu/v/12KJQDQxImNTvy4Y6AdfzhRACg+tcCvvRHhPNmRmk5j0u2bqR4Rf3WM8559AdQaZe+BES1Ts86vRaW/lkZf1m+txDrBTWTLEFRCO5BJ5voe0a5fJJNuwYoNItYigcj6XBggg0euKubfwxiwkAAAJZSURBVHic7dzJUxNBGIbxQWU6USAoGaJRCKIoQgRFUOJGjI6Y4BqQCG7gLm7//00gRTEz6e7vlOnL87u/xfdUZTi25wEAAAAAAAAAAAAAAACAVs+Ro8d6fXUokz1+os+26B/IDWYiC//kqaF8T1r3GgQDw9GIA4XTZ0yL4tlzmoHKjgRp3p00mivprto1dl6/GL9gGJQujqZ7e9TEJcNVuy5P6hZXpsyL6Ym07z8QlM1XKXV1pnMxM2ZblPvTb9g3OWs7S+WKyUFxyDqYvebmOylet56l/HxyMXfDvphfcNHh3dT9v4q6lVxYf4p76YsuOjzLl95WuR0f3JmXFh3pqbgrnaXuxQf3l6TBoJOQqhjyID6oPZQGBSch0iei1KP4IBQXj52EiB1qOT5YlheEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIV0iv/kQxgehOPCdhGTEu2rxwcgTaVB1ElIXQxrxQaNXGtSdhKyIIePxwdNn0mDFSchz6SN5kVzkhIEf6v5O170cFs56lVw0tK+2Hco2XXR4Xs30blvb6lpysPbaOiitd7zIlY6gZTvrzUbnYmPTtmhZHxPspoVV81Vv3+kW7z+YF46eCdv3ccv069qe0y8+GV8FbDns8Ly+z/p3GstfTIuv37SvbGXXnf2u2oJm+H2qEI2pbP74md8xL3Z+/Z7+U4kM/Gr977+mo+8cAAAAAAAAAAAAAAAAANLyH2yZEu1iJpIUAAAAAElFTkSuQmCC',
	stop: 'iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAATJQTFRFAAAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////LddBWgAAAGZ0Uk5TAAIfapjD2+jq5ti6ilkVCTSTzfT+//3syHwiBAYys+GUJgFW1cQrB3f48kPn1EzdN8A12QgDVSDOnQ4qUYSisK6edftF69cjFMeRCjsh4MGSVyXCo/FB0yRLNr+kVJv8PA0pn3YLYDIzIAAAAeJJREFUeJzt3NlSE0EYhuGOJISExKCkJ8bAAIMSFCTI4gok7EZQlqBEkR3v/xYgB1LFAWfzf1rW+97BU9M91Uefc0RERERERERERERERERERERERP9piQddyVR3uieuMtneXP6hnFHoe/S4v+jjLSg9KT+tKBkDg2EpZsSfhoZHdI5o9JkR46bi8zGVozr+ws5x08sJzfGKxidNHd6/mooEjoFR2+/RqTYtgAwa3o/bXlfNHYVQ4PC+bA6Zsfrv3m12ztgxPyxxeP/G+L6/fSeCvP9gC+nqF0HSH20hybjfV/cVLNhCUiKH94u2kG4ZZMkWkpZB6raQHhkkBAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA+TuQjAzSsIVkZZBlW0ivDLJiC8kFIsfqmi0kvy6CbGzaQj41RZDPW7YQVxZBto0d7stXiWPH2uEqu4r5imDPHOL2WwLIgWKYauybuaOp2aL7fmjsCNsSh6v8qJk6mu2EBuKin0d2jOCXcuOwWt4wcrTy0n1D5+aOTzJxv7tOZ3fPtIpO0fnFwuJSPYyrxuXVWvu33kFERERERERERERERERERERERP9419+NqL3Qxqw8AAAAAElFTkSuQmCC',
	eject:
		'iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAW5QTFRFAAAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////g6RELgAAAHp0Uk5TAAIbV5qymVQZAe///u2TFUrq5kT08VJY61318/f2Tl/4afr5YXNaXFZjU2RgWfDuZl5oB3FrBnJsZfJtYnD7agOGf/xndf1ud295ewR0fE/nfc3MwRDV1kM/0a/c6dusWwgaEidQJj2kibal3rnjwngJxCELO4Gtu72+5PiYAAADmklEQVR4nO3bCVcSURjGcQZzuVzMNAkXTAXFTFNSzK2QMDXLzEwzbTE1933Nvn2D51gKCDPMvO8dO8/vE7z/c+fOwgwuFwAAAAAAAAAAAAAAAAAAAAAAAADA/09zF9wpLCwqLhGqJ7GmpMgjk7yld8tUz2LFvXL5V8V91dPkr6BSXuF7oHqefPlL5TVVt7SkukamqC1QPVM+igOpHVLWPVQ9lXn1Dekdeolf9VxmNQYzdUgZalI9mTnNGdcjKRBWPZsJoqXupg4pKx+pHs8wUe25uUPK0ltz7mrNsh4Xa9KiekJjwqHsHfo+eax6RgNEW84OvaRa9Zg5ifYM18F0NU9UD5qDaO8w0iFlp7PPwiJiaD0u1qRd9bBZiKcG9selBueehUWXiQ69xKl3K6L1xvuSzOqqHfkg3x31meuQ0tPzTPXU6USvyfW4WJM+x62J6B8w3yFlR73DSkSfqX3+T6Bf9ejXiLYbnqNyCznpDlIM5t2hl0Qcc3Rp5q4fqQLPHVIiGmutdEjpc0aJeGFpPZIaGh1QIrpiVjukDDYpL9GiNnToJUOKS7Q+C+erqxr6lZZofZW5ZzRmQOVZOP7SpvVICiU0VR1aYti+Dn2fvFK0JmJk1M4OfU3GlJSIMVvXIymmYp9or23v0EvG2fdJ3J7rR6rQEHOJFk17r2aP2h7WEu0NyXokBXsZ94nWS7A/LsX47lbibwk79JJmpqNr4h1ph350DcY5OuIjOd7jWFc5xrAmYpJ4PZKCUfp98p6hQ98n5F8WuMtzT2GHqRLikA88HVI2E4dMc4V8JA7p5ArxEYeQ3ZqkChKHVHCFTBGHzHCFzBCHNHl5OrytxCGzn3hC5maJQ1yfWa7swwzf1oYt/vZuhI/j7Y82v0DdsTDP82wlwl++fvPQ6Jz6vviD8WF3qWzZTWJ5pZuvAgAAAAAoTfxcHZ9MEJgcX12b4OtY38j6BxFrPBvrTBlLmwa/f89Xx+YSR0fZFvkPKd4thj/2atvUGUnb9G96IhwdUkaoO1Z2eEJ2VohD2H5ppP4rwy5Ph5S7xCF7XCF7xCGWP401KkQcwvaiJ0YcUsUVUkUcss8Vsk8ccsAVckAc4mY6tqrcxCGuBE9IgrrDdXjE0XF0SB7iWmP4+GF6jb7D5Tomv03ZPebo0B9J/HM2f4N91eicn+9D05PTs1/nvwmcL56dnrBlAAAAAAAAAAAAAAAAAAAAAAAAAADY7Q/tuYJujzsMeQAAAABJRU5ErkJggg==',
	skipback:
		'iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAspQTFRFAAAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////17LOWQAAAO50Uk5TAAYzktv2/v3y0Is3CCNgouHToVcaAwEORJze+PTVlkUQBA8yb6zW5dirZSZm2v/DYRgCDTB1wuaXOQpQ6vfJXh627+ydNQcVxxE2g995HEG9QiBcsvCxO2P5Uwt9zM9tWAwhpOP84n4fCW4Td8WaGVXZrUMnNHG4t0wvHVHS87xqtOm+BRdIkM0p+ogiW+Q6gsRU6C12S5S7G0aN12uwyitnqt2Bxj57wOv7JbpWmPG1MU0sFIlfpvU/waB65yrLhHTRUo+TJH9dmSjcbBJKLnK5fFruhq5pkc5weGSKFjxOr0dJo56O7Yep4LPIpYl5dOUAAAZvSURBVHic7ZyJX1RFHMAHgwVlUxB2MIHYXUwuWeFBcSiC3IgJImqAKCAQeJGKB4cI+FaUVCQsNA3vTNBMzLwSUPOgNLW0LM1Ku4//oYemcuyy7+2bz+48Pr/vHzBvvu83v5l5s7M/hAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYaFoOes7SSWdsMHmIrJ9fo80OHDbazH+7gqCDWpgGw04gXRjrLrF1cX3RTYkKNqtTuo14a7eHp5e0jJ9WmIZRjfGWaR7iM9fNnSDTJBAS+/IpNV6uyoOCQUNOYqMaN1zwhbEK4WnyL2CJi6MTI/1+OJio6JlZ8mzyIi3/qoZFFRfuIfn2qhEmJltbPGp386hQiYTZEkqYbzslTRb4+LE+Zljq9e5thM2aaJCSvdX9oWnx6hqjWVAm2szKduzepkc2epsQmSJM5PUQmZGWLaIuR52TNzc3T9CT/9YJCcvO6XuaRE1HNt12w0EXWy0MTuci9yJ9ch/VBTITLjjeiFzv31uASb8nS4mKSXdYNKRFVwrLlK6Ks+3po8laWBJYS7bNOyIjg2LLy4FUVfYbVo2xfXR6zjHCvdUBERKEurayq7p3lT1iTPimGdLf7QkAEs9q1NetsdIZDSiJM9nq/JUG1+jQkI6KKm/pmpv5wSEUEyzds9NrUTzgkIsKo6zbX2+iadCUlgi3K3hrW0H84pCDCZG95u1732iEpEZX2ncaRBkaVBESY0PWjtkby0KBchN327vYdBrODehFuDXyvKUjflkQyIjjWcUTizr4fHlITYTJ27d6zN4y3B60ibFHSvv2RfGYrqkWYUB+/uZ5W/MNBqQirff/ABwebhWjQKIILW6ZFu/LPclpFmPkhCw4FCQwHhSLyiMMfzj4iJMupFFEobZd/tMlZ6LCiToSNKG/MFDTpUinCqI/OabITsAZSKqIqaq2ZECU8y2kTyTg2Zs9IK+OGFUUizMduxxeO57ljp1eEWwM/OWF50vhwUCKClac2n66uNTLL6RFhIw6fWewiKhw0iODQQZ8mnxUZDgpEFNrWRZ7isoMGESxvm7fyrJjJig4RLN8yq93QWagUROSBHfbCvgPpFFHknDtv1E6XMhGsvLBC8IcgjSLsls88iHmYU8TJod7ovS5VIv4H8sl5mFMk5WLFwBC5dIbvATXlIi3DyCyFZhfJCbYaGCKOlz0GhojySjvBsWVGEYtlnQcHhAiOC99PZAdvbhHEfr75C2KDy6zb+NCQ4D63LCUpgjNmXtxLaHSZ+1M3cN9s0QcoFIggpCq70nSWxCbY3CIIq0/V2BMIitlFEC5su7qyoVnsJ5b5RRBirn3Z6VohMig0iCBUeP3GzQZxmUKHCFJoy8/4isoUSkQQdgr5ao3QSwI0inBBcfz6xF7jj+voEUH42qnEhbeM3bJQJMJt7DeEe002MihUiXAfW0tvC7vdRKsIkrd4f5NvzIEwbSKI0a7dnmnEZRTqRLi9/a5vUz3SJH/NCXXdgSi58x2Py9fUiyAmoPT7rQJ/r6ZShJuIC9KDXU8KMaFUBCmyj949LeSKDa0iXFBSHKJ9+U/E9Iogxsn98s7pfCdiikW48VWQdSJf+pf8UdeaEpN4nl/O0y3CrSk591I9+OyIaRfhPujrfhjN44OeehGE2JbKKgP/3ZOGCGLuu91ZZegGkRREuJwvvbEiV/p/qOz6L+K2ksb+j76kIdK1Ok66e7O/Q2KpiDwukrBD/9GXZES4dX7+j7OS9Z5HSkgEMaEtG4f76jllSb4gmVIJXVUG4qZ21Os8ZbG++ZP7UbKd1gWxciJMQJv3z3Y6Nve1Mx7saiPZZd2QK/CCWceHx9v71hqo+KUupYBgj/VAtOROwLHKqobe+8jqIcVqJ2L91Yt3D5H94oogcatja6N9WE+RxVe1rIpUd/XzoPsLDEteKrKEFBeUOcm3ug+v5jUPTVLzbMq6Z8+URf26XmxRL8wWjVvkm/as0Ybfik1ST4/d/fvTZzq337smvkUm4/qC00eeBKWiqsTJNEXoiv7wfLx5tZ4+9sYlIoOZ3dZaE//oN6686iaH+yap3Ma9QEe/P+3/yrWzjO9M1xIaBDi2rKTj78GWo7feTkowkQf3VK23V337P6s7s/zJjQEcYHvu30MzOpKIlX4EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgi/8A9C1Yf4L0kpsAAAAASUVORK5CYII=',
	skipforward:
		'iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAhlQTFRFAAAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ImYJ5AAAALN0Uk5TAAphu9/v3rhpFwFKtuz8/vHDVgQpy//qkRiC+v2YCCfnYgJ3rCQj5Vj53FdcBq2pFXx0IevdR4R7Q48ZQm51B3nFJWaw7W21Xvek5kUD9YsJ0TzyeA77vPRqtxvpX6Ud2WAFGtZE+JAS1DOADzfoWp/STZNT9kGBzCvgRj7VHJfuOjsonqJJVOKnEHLO8M3jWavkcyzzKgyMTxFbJg05yDY42z3hg3qgwkhVwR8ecX/Elohag3ONAAAEMElEQVR4nO2cB1cTQRRGFxuKkrXxUBMEFQXsXeyKYsdCNGDBgoodK4oVFQv2gr333n+heoSQTbbvnnXenO/+gJvclEnZN6MoAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAhae3ad+jYKb1zFz+lGV27ZYZUtXuPnr381JrRO4v+kd2nr2/SXv3CLdZITn/frKbk5lGcjgPS/JEOHBSKS9V+A/2RmpOWTgmE8gf7Yh1SkCDNG+KL04LCItIwdJgfj99wjbPQB6MVI0ZSEpFRo71rx2iUY70LLRk3PjmEaMJEz9pJGmGxD3fUismpHX/enlOmetQGH9JOL4Qoa5o3bfAh0/VDKHvGTC/a4ENmGYQQzS7xoA0+pNgwhDLnZLjWChVCNDfXbYpgIVQ6z+Wno2ghRPN7u9KKF0IFC0a40AoYQgsXufhyL2II0eIlZU61YobQ0mXLHWoFDSFaUe5sIRY2hKIrVznRihtCsQonC7HAIUSVq+0vxEKHUGTNWrtasUOI1lXZXL5ED6Hw+g22tMKHEG3cVG1DyyCEIjmbrbUcQkjdslWOEKKabdvlCCHasVOSECratVuOEKL2e0y+R3IKodqxxiWsQogqDK9BMAuhzL0GTwq3EFL36X86sgsh2n9A7wc9wxCKHtS52MkxhGjLIUlCqG5K8g96piF/npTD2uWLbQjVHdG8U/iGENUflSSEjh1ve3mxDqG8E5KE0MlTkoSoOa0jTcxDaGG5JCHUIEvI6TJJQqhElpAzsoSclSWkUZKQaLUkIecUOULCrfNq3EPOt15lZB4yIT6rxjuk9EJcyzqk9mLbcBfnkKGJ/87zDQk3aK6XsA1pOqSdGWQaEj6fPLnNM6TpQMrFBY4hdZcup2oZhnSo0psZ4hcyX3/wnFtI5RWDLW3MQq4ajg2wCrm2zHhOiFPI9Ykmc/N8QiINpvtI2YTcOG4+B8wkJHTJakqTR0jTTUsti5BbjdZaBiG3m+1MzAofoq65Y0sresjdGaZzc22IHaJm3bOrFTokNum+ba3AIZH6cmtbHHFDih442jImbMiNh872iwkaEl70yKFWzJDoYzsbFDSIGBJLf+JcK2DIteanLrTihdQ/c6UVLWTdIJcHJggW8vyF28NehAqpPOJ4sYoj0uEVG1+6P/LhP4TMM8iIpozyOiL4kAX6Ha96ejsKKfiQ17od+SUeXlZ/CT5k7ZvUjOwBHjMU5a1G+M6Pe2pB2fuUjg8+nOv1TmNs9i605uNSbUbtFTenbiRTqHF+8sFoSfWoxJtUP7/wxfol8RVbMM4XpxVfE46LixVbbfm0Sca3WFwa+R7IYXqKUvKj5RYr8238h2iTspU1LdbQz4CON1SU/lUVi8OlV3/lOj7+xIxpI5vu1tWUfv4U2IGTAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAcvwEMG8mqA7KLiQAAAABJRU5ErkJggg==',
	searchback:
		'iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAnlQTFRFAAAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7olAIAAAANN0Uk5TAA5bns/g2bp6KgE0g73czJxRC17f//iSCRmv+tMKhPsgNtvyahrNInj3dj/WFRGX/mADc6Ur0e8oDE3dsAQz0NICf/1KResxEqujB4fU8QW8Sy853uMIDZtO6BQXrZP89D3kgMDzGPVAfmkeD5jixm5TaCOqWOos1VDwtwaU+TwWrl0pmWLuJ7k7HcJH5qhtJc4fxHfBtmWI6cqxa+yKVZCmEOGks0yyoqkTJIHlHNobkURn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',
	searchforward:
		'iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAmpQTFRFAAAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////xH3ReQAAAM50Uk5TAB11tNnn1rBsGQdKlsvj4caPQQYEZOX/YCiu/fymHhWlrBhP7u1VwSNY/vt2BQj2XwJAtnD4ewka0i68FpuC3jH5jAP0Y3y9XsjiMpwnLPHvdOY0V4oK931zJeyYD0npznro8FZ5Cy/AFPNTAdGNVLeODOA2wxfyZzqQd8+aQ9Mtf0KdDYMgp/rdslBGl6obohAkE+RqSCow33GSoaORKUT1cr/qmRImXag7tTPYq07Nnj67TTi5R+upKxHaRYHMxNxak2a+hmGtpLNixYs8jntmAAAFi0lEQVR4nO2c+V9UVRiHBwwwckYx5KvMKAqoMVMiwZBWKpNgRWZmGNLmMtqqAdGmaYplWpJttGlUqGWb7bZa2L7/T02ydGfmLufcc87lzP28z+/v+bwPl3vunXPf9w0ECIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCJ3Iy59wTkFh0cRzXcYXnzcpGJo8pWTq+VLT4qV0WhmGCU0vdbPAjPLwcHxk5izZyXFQMXskjRThOZX8C1RVj8Vj7jz5CTJSPB9GCi/gXaAmaoyPXXiRiiydWVCEdGoX1nEtcHFtxgL1FYpStacBmcQbL+GIX7Q4a4HgpcqytWbW3Kw8gMsuZ19giUl8NedFlcFSkzyAZU2s8ZUJ0wWuWK4wZzPyCkzzQHML4xNhhXk8ruTeM8S4yiIPhJcUs8TXXW21QOs1qnNPY6VVHsD8axniV11nGb/6euXZG5hiLYI1NzjHt9nEY+2N6gVGabVLpH2d47Otwy4ewZu8cDjLzbaJ4JZbHeLX2ceX3eaJRYr19olgwwz7+I0O8e0Nrt5C+dnkkAiSm23jtzjFo/52PUQQbrS7ZZ1FsOEOPUQQvfMuIRHcfc9WLUSAbdb7MIsIau9leriqF0GiU0gE6HLa/TwSQaz7PiER9NyvhwjwwINCInjoYbVv9swiaN0uJILYDqVPFHYRtD9isvmwiwA7VZ6wcIgguiv72cYjgmWPqtuHeUSA3XuERBDvVWbCJ4KevUIiiDz2uB4iiOwTEkld1Cf0EAH2p72wcItgU5UmIig0/hjnF8GBfSpeWFyIYL3heNeFCKIzFbywuBFBtHvslnUjAjw5VQ8R4KnRFxZ3Iqg+KPuFxaUIevqERBB+mud8WaEIVtcIiSB66Bk9RIBnnxMRAcoyH67jJYIJzwuJoHmaxJNuEREU7BUSQXjXC3qIIN7RKBSPnW4/I0sWSV0Uwfj+zZLeh0VFhDnwok9EEFvhExHgJb+I9L/sExHMkXDDayESf8UnIijxi8ir4v9beohA/FO2JiKH/SJyxC8ir/lFZMAvIr65Iq/7RcQ3u5Z47aAeIr55sq8V9tBDJC6hyEMLkdk++T0SekPcQweRxJsSPDQQiW2R4TH+IoPTpXgIiziVEjoR6tTipLH6qFUhNhvRY3qc/R7vEzuNj7z1tiwPIZGuE4LfR1okfkgUEBn473O5yBerJnkaAiLJd87GuxYJv6vHN8TW9wJCIpFuyZ1YLkXeH+2Nc/udvUp2vZO7yoeSsao+l5UPH0jWcCdyvOb/+FyuRTlprPt3Ux2Ur6L/il/kw7SOOBf1Wh8p0OAXCW9Mj+cW+di8fthrkcl9GfG8NY0r9ahpzO7j5awyPapFlWn0k+wC+Vys+41PFKzEDtr0oXgo0v+pWXzu1cZ/Zt6wzyySbNOiWyF2xGK3ybH+kfjnVvGMIof06OjZfcoyPpd6rKJf2NS5MXW9falF11u4164jkqUPsUm9BoPIVwdt451FvvamM9TpgG3bN/bxTr268cMeDRdx6J7e8a1DvMMB3envPLEIOPWzfy/Yzz7EMqRADmds0viB4SE2L2odH1vq4YQBs6kmI5xh+f6yKmkZn8xXnr2BHy3/nD8tYImvs7ykJ5sUp55O3hrzNAZ/ZpyLYlWK/Yt34x6GMd92FjMM4BimctAsPvGr15NqzGcHHeMYsmU6O+g372cHmUxzSvTy7DYm05yGPBmOkMnW3zPSaK9xDjJyKnO+VpeHu66R4vq0NIIneBfobDbGN3eM08SzQKDiD8MMuvJF/AtUGe6z6jb5CTJT2jI6FbBnobupgEUjf4rYwHhOBUxR3PDn6YLC8r9cb5rbJw31h/7+R0YxBkEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQRC7yL4sYF17LsMDFAAAAAElFTkSuQmCC',
	record:
		'iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAb9QTFRFAAAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AlH9xQAAAJV0Uk5TABlGc6DCztnk7//BEkqFve4PKGKd1/7TmV4jJIYMYcNgAlfVVjfQHKIWB3318R3MUAWWlBC+vAvSx9vaHuLhJRsUCcaurJAyKda0snhw8utBNQPYygHNy0iwFfowgMD49whAiL/z8CAYaMjoOO1suPShJlg0b2PgM6OXBLGzp6SajYT2LxN2qz9du2n9+7plXOyoeUlQ3GpuAAAF/UlEQVR4nO2ceWxVRRSH79TyYvRVYwkmpiWhJRZaFaipMUYTi0Sr2KItlEBTlqIi4B6UUIuKQdlcEndc2ATRRISwusSNRI0mbjGCgkZJtNWIqQaMiZS+ax/Na0p4vs7vnLnD8fV8f/SfnnPvfHn33pk7M/eYIEswJ7oBrlARaaiINFREGioiDRWRhopIQ0WkoSLSUBFpqIg0VEQaKiINFZGGikhDRaShItJQEWmoiDRURBoqIg0VsTh0D0HYxYB/kn+jO1skR40nm384zT9iXS65f0RxSvci+UmJvzIEHLVsc31a1yIF5vcci7BELK/V7Ymdigw25oB1cEdB508Oz+1QpMiYX6CEs0znj87O7kwE1kjiUMWVyNnmZ1JeYfidmwa4ERlm2jM9pzIRzzffuGiCC5EyY35gpA/dM2wPvxEOREYY7tUx6PSv2K3gi4zan64Lx4gN+ZJ7CK5IufmW24SjlCa+4B2AKVJhdvMO0MO55hNWPk+k1MHFnWLkn6ynF0tkRJx9afei3HzAyOaIFBR/xsg+ngqzi57MEKn82Gaci1Aee4+cSxe57G9390eKi8J3qalkkaKhH1FTM3Dx99RBJFnkCs6d+d9c8hYxkSoy5DdiYl+cuZ+WRxSpauUMEzNRXPgGKY8mcsZ5n5LybLj0AOnYNJGx75PS7Bi9g5JFEqkmPyStGLONkEQRGZ33NiHLnssPEvpFikhujJCEcPgInkMQuZb6qLenajOcgovUmdfhHJSxiU1oCi4SWVfYG7xbhEXq25jvpFZ0jnsVzIBFRu1DM0iUoK9sqEi92Q5m0KhJgD8JKuLpBwmCca9g8ajI5C1gApVrXsbiQZEGgz/hadR+jk2qgCI172DxDMARFyhSQls8oFCI3Y2YSCPc4TI4uR2JxkQielFPz/h1SDQmMnUjFM5jwotINCRSdgE6cOAw0awGoiGRGWAnxWTSKiAYErkO7KSYQDcJJDLRzzgrRcMLQDAiUjfwJbQtLBqfA4IRkRuh56EDpq6wj0VEPN/r2N2OiMxeCzeFx7Rn7GMREa/9ehJkah4RiXSiNB3IOwkiMmcN2hImyCAFEfE4hu9m+tP2sYjI+Ohn5o7lqtfsYxGRm5BBnAuanrKPRUSm+Rz7JkG6dkTkFLglTOqBjqtf/iJZc49kzVMra/qRrOnZvc37pohqrOV99Dt5pX2s6PcRZAFO9BvijCftYxGRWdDUnwPKgF0p0HTQzPVoU1gg/SEm4vmxBS1aQSIel3mSQEs9kIjX5ZEgqEOuZEikqBp4sLMJq5HRNrY+4vUmwdZ1MZFbkWllLtc/jkRjIqXn+1qdDoLacAMSDq7q3vY8Fs8A3DEAinjZ49QNuK0GFBl8pa8lkpm7sO1U6F6UO54FE6ic9isWj4rUfkj94BAj3vgolgBvPPN0u9/wGJgAi0zaimaQgJamk+B7GsOdaAoBZP6kG3yX6VxgPYzM7EfQDMK+35zof5KaDg/7foPaN/EckDkPwyn9eW989nytENyFzArg3LyckET7oudq+oePfVNJepjQRCrGPEHKs+HUI6RKNsSv3uZvj+yrtzZoT2YP/f07xMh20yET8MdA/+i4GR2f2nD7YmomXaTFgG8MFsxdTy5cw/ievWlTBz05LQ2d9HVjToWBC8OvGdnHc04Oo34Fq+ZD2UiXM493buQUrOFV4WjJfYiV35t5u1kbK7gFXu5fxjxAivn38vLZJXeKm5ZwD9FF82ruSIFfO+iBQ/xx1y15C7iHcFDN6cHl3MfwgHkt7FY4KRS2eAPnwihuuNtBGxxVPJu+iJoazw/3umiCqxp0S1dlRQ26LopOCglVAcNQWlXAgKDiUMN1CdBlZqF17MIVTl8yXdcyjd+3d3jfffQiY+5xvDwRQZncWcPbBzZn+P8Sk1jgfpElosLFVdXr9qWt91sypXVpJGeMsAJz5YSDh3oXm13zP6zAfAJQEWmoiDRURBoqIg0VkYaKSENFpKEi0lARaaiINFREGioiDRWRhopIQ0WkoSLSUBFpqIg0VEQaKiKNrBH5F0CWMdjTMZ1/AAAAAElFTkSuQmCC',
}

module.exports = async function (self) {
	let presets = {}
	presets[`status`] = {
		type: 'button',
		category: 'Status',
		name: `Status`,
		style: {
			text: `OK`,
			size: '14',
			color: combineRgb(0, 0, 0),
			bgcolor: combineRgb(0, 204, 0),
			show_topbar: 'default',
		},
		steps: [{}],
		feedbacks: [
			{
				feedbackId: 'caution',
				options: {
					caution: respParam.cautionSenseReturn.mediaError,
				},
				style: {
					color: combineRgb(0, 0, 0),
					bgcolor: combineRgb(255, 128, 0),
					text: 'Media Error',
				},
			},
			{
				feedbackId: 'caution',
				options: {
					caution: respParam.cautionSenseReturn.mediaFull,
				},
				style: {
					color: combineRgb(0, 0, 0),
					bgcolor: combineRgb(255, 128, 0),
					text: 'Media Full',
				},
			},
			{
				feedbackId: 'caution',
				options: {
					caution: respParam.cautionSenseReturn.takeFull,
				},
				style: {
					color: combineRgb(0, 0, 0),
					bgcolor: combineRgb(255, 128, 0),
					text: 'Take Full',
				},
			},
			{
				feedbackId: 'caution',
				options: {
					caution: respParam.cautionSenseReturn.digitalUnlock,
				},
				style: {
					color: combineRgb(0, 0, 0),
					bgcolor: combineRgb(255, 128, 0),
					text: 'Digital Unlock',
				},
			},
			{
				feedbackId: 'caution',
				options: {
					caution: respParam.cautionSenseReturn.cantRec,
				},
				style: {
					color: combineRgb(0, 0, 0),
					bgcolor: combineRgb(255, 128, 0),
					text: `Can't Rec`,
				},
			},
			{
				feedbackId: 'caution',
				options: {
					caution: respParam.cautionSenseReturn.writeProtected,
				},
				style: {
					color: combineRgb(0, 0, 0),
					bgcolor: combineRgb(255, 128, 0),
					text: 'Write Protected',
				},
			},
			{
				feedbackId: 'caution',
				options: {
					caution: respParam.cautionSenseReturn.notExecute,
				},
				style: {
					color: combineRgb(0, 0, 0),
					bgcolor: combineRgb(255, 128, 0),
					text: 'Not Execute',
				},
			},
			{
				feedbackId: 'caution',
				options: {
					caution: respParam.cautionSenseReturn.cantEdit,
				},
				style: {
					color: combineRgb(0, 0, 0),
					bgcolor: combineRgb(255, 128, 0),
					text: `Can't Edit`,
				},
			},
			{
				feedbackId: 'caution',
				options: {
					caution: respParam.cautionSenseReturn.cantSelect,
				},
				style: {
					color: combineRgb(0, 0, 0),
					bgcolor: combineRgb(255, 128, 0),
					text: `Can't Select`,
				},
			},
			{
				feedbackId: 'caution',
				options: {
					caution: respParam.cautionSenseReturn.trackProtected,
				},
				style: {
					color: combineRgb(0, 0, 0),
					bgcolor: combineRgb(255, 128, 0),
					text: `Track Protected`,
				},
			},
			{
				feedbackId: 'caution',
				options: {
					caution: respParam.cautionSenseReturn.nameFull,
				},
				style: {
					color: combineRgb(0, 0, 0),
					bgcolor: combineRgb(255, 128, 0),
					text: 'Name Full',
				},
			},
			{
				feedbackId: 'caution',
				options: {
					caution: respParam.cautionSenseReturn.playError,
				},
				style: {
					color: combineRgb(0, 0, 0),
					bgcolor: combineRgb(255, 128, 0),
					text: 'Play Error',
				},
			},
			{
				feedbackId: 'caution',
				options: {
					caution: respParam.cautionSenseReturn.otherCaution,
				},
				style: {
					color: combineRgb(0, 0, 0),
					bgcolor: combineRgb(255, 128, 0),
					text: 'Other Caution',
				},
			},
			{
				feedbackId: 'error',
				options: {
					error: respParam.errorSenseReturn.recError,
				},
				style: {
					color: combineRgb(0, 0, 0),
					bgcolor: combineRgb(255, 0, 0),
					text: 'Rec Error',
				},
			},
			{
				feedbackId: 'error',
				options: {
					error: respParam.errorSenseReturn.deviceError,
				},
				style: {
					color: combineRgb(0, 0, 0),
					bgcolor: combineRgb(255, 0, 0),
					text: 'Device Error',
				},
			},
			{
				feedbackId: 'error',
				options: {
					error: respParam.errorSenseReturn.infoWriteError,
				},
				style: {
					color: combineRgb(0, 0, 0),
					bgcolor: combineRgb(255, 0, 0),
					text: 'Info Write Error',
				},
			},
			{
				feedbackId: 'error',
				options: {
					error: respParam.errorSenseReturn.otherError,
				},
				style: {
					color: combineRgb(0, 0, 0),
					bgcolor: combineRgb(255, 0, 0),
					text: 'Other Error',
				},
			},
			{
				feedbackId: 'psu',
				options: {
					psu: respParam.psuErrorReturn.error,
				},
				style: {
					color: combineRgb(0, 0, 0),
					bgcolor: combineRgb(255, 0, 0),
					text: 'PSU Fault',
				},
			},
		],
	}
	presets[`play`] = {
		type: 'button',
		category: 'Transport',
		name: `Play`,
		style: {
			text: ``,
			size: '14',
			png64: icons.play,
			pngalignment: 'center:center',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			show_topbar: false,
		},
		steps: [
			{
				down: [
					{
						actionId: 'play',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'mechaStatus',
				options: {
					status: respParam.mechaStatusReturn.play,
				},
				style: {
					color: combineRgb(0, 0, 0),
					bgcolor: combineRgb(0, 204, 0),
				},
			},
		],
	}
	presets[`pause`] = {
		type: 'button',
		category: 'Transport',
		name: `Pause`,
		style: {
			text: ``,
			size: '14',
			png64: icons.pause,
			pngalignment: 'center:center',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			show_topbar: false,
		},
		steps: [
			{
				down: [
					{
						actionId: 'pause',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'mechaStatus',
				options: {
					status: respParam.mechaStatusReturn.readyOn,
				},
				style: {
					color: combineRgb(0, 0, 0),
					bgcolor: combineRgb(255, 128, 0),
				},
			},
		],
	}
	presets[`stop`] = {
		type: 'button',
		category: 'Transport',
		name: `stop`,
		style: {
			text: ``,
			size: '14',
			png64: icons.stop,
			pngalignment: 'center:center',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			show_topbar: false,
		},
		steps: [
			{
				down: [
					{
						actionId: 'stop',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'mechaStatus',
				options: {
					status: respParam.mechaStatusReturn.stop,
				},
				style: {
					color: combineRgb(0, 0, 0),
					bgcolor: combineRgb(255, 0, 0),
				},
			},
		],
	}
	presets[`record`] = {
		type: 'button',
		category: 'Transport',
		name: `Record`,
		style: {
			text: ``,
			size: '14',
			png64: icons.record,
			pngalignment: 'center:center',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			show_topbar: false,
		},
		steps: [
			{
				down: [
					{
						actionId: 'record',
						options: {
							mode: respParam.recordModeSelect.record,
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'mechaStatus',
				options: {
					status: respParam.mechaStatusReturn.record,
				},
				style: {
					color: combineRgb(0, 0, 0),
					bgcolor: combineRgb(255, 0, 0),
				},
			},
			{
				feedbackId: 'mechaStatus',
				options: {
					status: respParam.mechaStatusReturn.recordReady,
				},
				style: {
					color: combineRgb(0, 0, 0),
					bgcolor: combineRgb(255, 128, 0),
				},
			},
		],
	}
	presets['track-skip-header'] = {
		category: 'Transport',
		type: 'text',
		name: 'Track Skip',
		text: '',
	}
	presets[`track_skip_back`] = {
		type: 'button',
		category: 'Transport',
		name: `Track Skip Previous`,
		style: {
			text: ``,
			size: '14',
			png64: icons.skipback,
			pngalignment: 'center:center',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			show_topbar: false,
		},
		steps: [
			{
				down: [
					{
						actionId: 'skip',
						options: {
							mode: respParam.skipModeSelect.trackSkipPrevious,
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}
	presets[`track_skip_forward`] = {
		type: 'button',
		category: 'Transport',
		name: `Skip Next`,
		style: {
			text: ``,
			size: '14',
			png64: icons.skipforward,
			pngalignment: 'center:center',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			show_topbar: false,
		},
		steps: [
			{
				down: [
					{
						actionId: 'skip',
						options: {
							mode: respParam.skipModeSelect.trackSkipNext,
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}
	presets['mark-skip-header'] = {
		category: 'Transport',
		type: 'text',
		name: 'Mark Skip',
		text: '',
	}
	presets[`mark_skip_back`] = {
		type: 'button',
		category: 'Transport',
		name: `Mark Skip Previous`,
		style: {
			text: ``,
			size: '14',
			png64: icons.skipback,
			pngalignment: 'center:center',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			show_topbar: false,
		},
		steps: [
			{
				down: [
					{
						actionId: 'skip',
						options: {
							mode: respParam.skipModeSelect.markSkipPrevious,
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}
	presets[`mark_skip_forward`] = {
		type: 'button',
		category: 'Transport',
		name: `Mark Skip Next`,
		style: {
			text: ``,
			size: '14',
			png64: icons.skipforward,
			pngalignment: 'center:center',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			show_topbar: false,
		},
		steps: [
			{
				down: [
					{
						actionId: 'skip',
						options: {
							mode: respParam.skipModeSelect.markSkipNext,
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}
	presets['search-header'] = {
		category: 'Transport',
		type: 'text',
		name: 'Search',
		text: '',
	}
	presets[`search_back`] = {
		type: 'button',
		category: 'Transport',
		name: `Search Back`,
		style: {
			text: ``,
			size: '14',
			png64: icons.searchback,
			pngalignment: 'center:center',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			show_topbar: false,
		},
		steps: [
			{
				down: [
					{
						actionId: 'search',
						options: {
							mode: respParam.searchModeSelect.reverseNormal,
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'mechaStatus',
				options: {
					status: respParam.mechaStatusReturn.review,
				},
				style: {
					color: combineRgb(0, 0, 0),
					bgcolor: combineRgb(255, 0, 0),
				},
			},
		],
	}
	presets[`search_forward`] = {
		type: 'button',
		category: 'Transport',
		name: `Search Forward`,
		style: {
			text: ``,
			size: '14',
			png64: icons.searchforward,
			pngalignment: 'center:center',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			show_topbar: false,
		},
		steps: [
			{
				down: [
					{
						actionId: 'search',
						options: {
							mode: respParam.searchModeSelect.forwardNormal,
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'mechaStatus',
				options: {
					status: respParam.mechaStatusReturn.cue,
				},
				style: {
					color: combineRgb(0, 0, 0),
					bgcolor: combineRgb(255, 0, 0),
				},
			},
		],
	}
	presets['search-fast-header'] = {
		category: 'Transport',
		type: 'text',
		name: 'Search Fast',
		text: '',
	}
	presets[`search_back_fast`] = {
		type: 'button',
		category: 'Transport',
		name: `Search Back - Fast`,
		style: {
			text: ``,
			size: '14',
			png64: icons.searchback,
			pngalignment: 'center:center',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			show_topbar: false,
		},
		steps: [
			{
				down: [
					{
						actionId: 'search',
						options: {
							mode: respParam.searchModeSelect.reverseHigh,
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'mechaStatus',
				options: {
					status: respParam.mechaStatusReturn.review,
				},
				style: {
					color: combineRgb(0, 0, 0),
					bgcolor: combineRgb(255, 0, 0),
				},
			},
		],
	}
	presets[`search_forward_fast`] = {
		type: 'button',
		category: 'Transport',
		name: `Search Forward - Fast`,
		style: {
			text: ``,
			size: '14',
			png64: icons.searchforward,
			pngalignment: 'center:center',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			show_topbar: false,
		},
		steps: [
			{
				down: [
					{
						actionId: 'search',
						options: {
							mode: respParam.searchModeSelect.forwardHigh,
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'mechaStatus',
				options: {
					status: respParam.mechaStatusReturn.cue,
				},
				style: {
					color: combineRgb(0, 0, 0),
					bgcolor: combineRgb(255, 0, 0),
				},
			},
		],
	}
	self.setPresetDefinitions(presets)
}
