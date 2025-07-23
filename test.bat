@echo off
echo ====================================
echo 🧪 Running ResourceHub Tests
echo ====================================

echo.
echo 📋 Running frontend tests...
cd Front-End
call npm test -- --run
if errorlevel 1 (
    echo ❌ Frontend tests failed
    cd ..
    pause
    exit /b 1
)
cd ..

echo.
echo 📋 Running backend tests...
cd Back-End
call bal test
if errorlevel 1 (
    echo ❌ Backend tests failed
    cd ..
    pause
    exit /b 1
)
cd ..

echo.
echo ✅ All tests passed successfully!
echo.
echo 📊 Test Summary:
echo   ✅ Frontend tests: PASSED
echo   ✅ Backend tests:  PASSED
echo.

pause
